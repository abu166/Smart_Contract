// Import Web3 library
const Web3 = require('web3');

// Initialize Web3
(async () => {
    try {
        // Use Ganache RPC server
        const web3 = new Web3('http://127.0.0.1:7545');

        // Fetch accounts from the node
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts:', accounts);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
