Indigo Nameserver
=================

The Indigo Nameserver is a DNS server, written in Javascript. It is intended as a more powerful alternative to modifying hosts file entries.

<img src="http://i.imgur.com/9aFN5C4.png">

Getting Started
---------------

To run Indigo, you need NodeJS and NPM

Before you can run Indigo, you must download the required libraries using NPM
```
npm install
```

Start the server using NodeJS
```
node server.js
```

Features
--------

- Create A, AAAA, CNAME, MX, SOA, SRV, and TXT records
- DNS lookup activity logs
- Basic web interface
- Basic REST api
- Configurable upstream/fallback DNS server
- Docker container for easier deployment

Wishlist
--------

- Configurable upstream DNS server selection (with failover)
- DNS entry caching
- Wildcard support
- Better local host integration support
- Vagrant plugin
- REST API security
- Web interface improvements
  - Column sorting
  - Log searching/filtering
  - DNS entry creation from logs
- InfluxDB support for nice statistics gathering
- Command line interface 
- Upgrade to Angular 2

REST API
--------

All REST endpoints return JSON.

#### List DNS entries
```[GET] /api/records```
Returns all DNS entries saved in the system.

#### Create DNS Entry
```[POST] /api/records```
Takes a JSON document representing a new DNS record and saves it in the database.

An example request to create an A-record is 

```JSON
{
"type": "A",
"domain": "example.com",
"value": "172.16.10.50"
}
```

#### Update an Entry
```[POST] /api/records/:id```
Takes a JSON document with the updated record details, and replace the DNS record specified by the ID in the request URL

An example request to update an existing A-record is 

```JSON
POST /api/records/
{
"type": "A",
"domain": "example.com",
"value": "172.16.10.10"
}
```

#### Delete an Entry
```[DELETE] /api/records/:id```

#### Get all activity logs
```[GET] /api/logs```

#### Get server configuration
``` [GET] /api/config```

Returns a JSON object containing the current configuration of the server

By default, the configuration object returned will look like
```JSON
{
    "bind": "0.0.0.0",
    "dns_port": 9999,
    "management_port": 9998,
    "database": "indigo.db",
    "logs": "logs.db",
    "upstream_dns": "8.8.8.8"
}
```

#### Set server configuration
``` [POST] /api/config```

Updates the configuration object. It is not necessary to send the whole configuration object in the POST body, only updated fields need to be sent. For example, to update the bind addres you would send the following JSON object as the body of the request 

```JSON
{
	"bind": "127.0.0.1"
}
```
