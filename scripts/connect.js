// Import Web3 library
const { Web3 } = require('web3');

const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');

const web3 = new Web3(provider);

web3.eth.getBlockNumber()
    .then(() => console.log('done!'));
