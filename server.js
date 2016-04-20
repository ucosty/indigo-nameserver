// Application Configuration
var config = require('./config');

// Data Persistence Layer
var Datastore = require('nedb');
var db = new Datastore({ filename: config.database });
var logs = new Datastore({ filename: config.logs });

// DNS Server
var named = require('node-named');
var server = named.createServer();

// DNS Client
const dns = require('dns');

// Web Interface
var express = require('express');
var webServer = express();
var bodyParser = require('body-parser');

// Record creation helper
var createRecord = require('./createRecord.js');

// Logo generator
var logo = require('./logo')();

// ------------------------------------------------------------------
// Load the database
// ------------------------------------------------------------------
db.loadDatabase(function(err) {
	if(err != null) {
		console.log("Failed to load database:", err);
		process.exit(1);
	}

	console.log("Loaded database from file:", config.database);
});

// ------------------------------------------------------------------
// Load the logs database
// ------------------------------------------------------------------
logs.loadDatabase(function(err) {
	if(err != null) {
		console.log("Failed to load database:", err);
		process.exit(1);
	}

	console.log("Loaded logs from file:", config.logs);
});

// ------------------------------------------------------------------
// Spawn the DNS Server
// ------------------------------------------------------------------
server.listen(config.dns_port, config.bind, function() {
  console.log('DNS server started on', config.bind + ':' + config.dns_port);
});

// ------------------------------------------------------------------
// Spawn the management interface
// ------------------------------------------------------------------
webServer.listen(config.management_port, config.bind, function () {
  console.log('DNS Management interface started on port', config.bind + ':' +config.management_port);
});

// Export the public directory
webServer.use(express.static('public'));

// Expect POST data in JSON format
webServer.use(bodyParser.json())

webServer.get("/api/records", function(req, res) {
	db.find({}, function (err, docs) {
		res.send(docs);
	});
});

webServer.post("/api/records", function(req, res) {
	db.insert(req.body, function (err, docs) {
		res.send(docs);
	});
});

webServer.delete('/api/records/:id', function (req, res) {
	db.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
		res.send({"removed": numRemoved});
	});
});

webServer.post("/api/records/:id", function(req, res) {
	db.update({ _id: req.params.id}, req.body, function (err, numAffected, affectedDocuments, upsert) {
		res.send({"updated": numAffected});
	});
});

webServer.get("/api/logs", function(req, res) {
	logs.find({}).sort({ time: -1}).exec(function (err, docs) {
		res.send(docs);
	});
});

// ------------------------------------------------------------------
// DNS Query resolver
// Do a local lookup first, then defer to an upstream server
// ------------------------------------------------------------------
server.on('query', function(query) {
	var domain = query.name();
	var type = query.type();

	logs.insert({"type": type, "domain": domain, "time": Date.now()})

	db.find({"type": query.type(), "domain": domain }, function (err, docs) {
		if(docs.length > 0) {
			docs.forEach(function(doc) {
				createRecord(query, domain, type, doc.value, doc.port)
			});
			server.send(query);
		} else {
			dns.resolve(domain, type, function(err, addresses) {
				addresses.forEach(function(address) {
					createRecord(query, domain, type, address, 0)
				});
				server.send(query);
			});
		}
	});
});


