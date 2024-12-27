const {Web3} = require("web3");

// Connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545");

// Contract ABI and address
const abi = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0x2D709c959024020365af83BfD4Db990021e24955";

// Create Contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Interact with the contract
async function interact() {
    const accounts = await web3.eth.getAccounts();

    // Check balance
    const balance = await contract.methods.getBalance().call();
    console.log("Contract Balance:", web3.utils.fromWei(balance, "ether"));

    if (balance > 0) {
        // Withdraw funds
        try {
            await contract.methods.withdrawAll().send({ from: accounts[0], gas: 3000000 });
            console.log("Withdraw successful!");
        } catch (err) {
            console.error("Withdraw failed:", err.message);
        }
    } else {
        console.log("No funds to withdraw.");
    }
}

interact();
