const {Web3} = require("web3");

// Connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545");

// Contract address
const contractAddress = "0x96121b9785f6e45fc0bf3032101b347c8aedf5c7"; // Replace with your contract address

async function fundContract() {
    const accounts = await web3.eth.getAccounts(); // Get Ganache accounts
    const valueToSend = web3.utils.toWei("1", "ether"); // Amount to send (1 Ether)

    try {
        // Send transaction
        const receipt = await web3.eth.sendTransaction({
            from: accounts[0], // Sender's address (ensure it's funded in Ganache)
            to: contractAddress, // Contract address
            value: valueToSend, // Amount in wei
            gas: 3000000, // Gas limit
        });
        console.log("Transaction successful:", receipt);
    } catch (err) {
        console.error("Transaction failed:", err.message);
    }
}

fundContract();
