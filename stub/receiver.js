'use strict';
const net = require('net');
const { unmarshal } = require('./unmarshal');

const listenIncoming = (port, callback) => {
	const server = net.createServer((c) => {
		c.on('data', async data => {
			let message = await callback(data);
			message = message + "\r\n";
			c.write(message);
			c.pipe(c);
		});
	});

	server.on('error', (err) => {
		throw err;
	});

	server.listen(port, () => {
		console.log("Receiver listening on port " + port);
	});
}

module.exports = { listenIncoming };

