const { listenIncoming } = require('./stub/receiver');
const { unmarshal } = require('./stub/unmarshal');
const { marshal } = require('./stub/marshal');
const config = require('./config.json');

const queryMux = async object => {
	const model = require('./models')[object.name];
	const data = await model[object.function](...object.parameters);
	return data;
}

listenIncoming(config.port, async data => {
	let queryObject = unmarshal(data);
	let resultObject = await queryMux(queryObject);
	return marshal(resultObject);
});
