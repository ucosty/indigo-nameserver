/**
    This file is part of the Indigo Nameserver.

    Indigo Nameserver is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Indigo Nameserver is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Indigo Nameserver.  If not, see <http://www.gnu.org/licenses/>.
*/
var named = require('node-named');

module.exports = function(query, domain, type, result, port) {
	switch (type) {
    case 'A':
            var record = new named.ARecord(result);
            query.addAnswer(domain, record, 5);
            break;
    case 'AAAA':
            var record = new named.AAAARecord(result);
            query.addAnswer(domain, record, 5);
            break;
    case 'CNAME':
            var record = new named.CNAMERecord(result);
            query.addAnswer(domain, record, 5);
            break;
    case 'MX':
            var record = new named.MXRecord(result);
            query.addAnswer(domain, record, 5);
            break;
    case 'SOA':
            var record = new named.SOARecord(result);
            query.addAnswer(domain, record, 5);
            break;
    case 'SRV':
            var record = new named.SRVRecord(result, port);
            query.addAnswer(domain, record, 5);
            break;
    case 'TXT':
            var record = new named.TXTRecord(result);
            query.addAnswer(domain, record, 5);
            break;
    }
}