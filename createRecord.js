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