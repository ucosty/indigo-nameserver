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

Wishlist
--------

- Configurable upstream DNS server selection (with failover)
- DNS entry caching
- Wildcard support
- Better local host integration support
- Vagrant plugin
- Docker container for easier deployment
- REST API security
- Web interface improvements
  - Column sorting
  - Log searching/filtering
  - DNS entry creation from logs
- InfluxDB support for nice statistics gathering
- Command line interface 

REST API
--------

All REST endpoints return JSON.

#### List DNS entries
```[GET] /api/records```
Returns all DNS entries saved in the system.

#### Create DNS Entry
```[POST] /api/records```
Takes a JSON document representing a new DNS record and saves it in the database.
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

Wishlist
--------

- Configurable upstream DNS server selection (with failover)
- DNS entry caching
- Wildcard support
- Better local host integration support
- Vagrant plugin
- Docker container for easier deployment
- REST API security
- Web interface improvements
  - Column sorting
  - Log searching/filtering
  - DNS entry creation from logs
- InfluxDB support for nice statistics gathering
- Command line interface 

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

