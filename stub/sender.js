const net = require('net');

const send = (message) => {
	const client = net.createConnection({ port: 9000 }, () => {
		message = message + '\r\n';
		client.write(message);
	});
	client.on('data', (data) => {
		// TODO: return the data in raw format here
		// console.log("data received: ", data.toString());
		// TODO: Remove following line later
		console.log("parsed: ", JSON.parse(data.toString()));

		client.end();
	});
}

// Test only, remove later
let queryObject = {
	type: 'model',
	name: 'user',
	function: 'findAll',
	parameters: [{where: {id: 2}}] 
}
send(JSON.stringify(queryObject));

module.exports = { send };


