const { Web3 } = require("web3");

// Connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545");

// Contract ABI and address
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdrawAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
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

const contractAddress = "0x176a2056C3831F565fe2C845b01b53E7c04a0F07";

// Create Contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Interact with the contract
async function interact() {

    const accounts = await web3.eth.getAccounts();
    const owner = await contract.methods.owner().call();
    console.log("Contract Owner:", owner);
    console.log("Sender Account:", accounts[0]);

    // Check balance
    const balance = await contract.methods.getBalance().call();
    console.log("Contract Balance:", web3.utils.fromWei(balance, "ether"));

    if (BigInt(balance) > 0n) {
        try {
            await contract.methods.withdrawAll().send({
                from: accounts[0], // owner account 
                gas: 5000000
            });
            console.log("Withdraw successful!");
        } catch (err) {
            console.error("Withdraw failed:", err.message);
        }
    } else {
        console.log("No funds to withdraw.");
    }
}

interact();

// Contract Owner: 0xf52B5090200F8c6461D05D0dA1787cCeA82a43cB
// Sender Account: 0xF53F6c8d9B885CEf99090FCEBE37910b729aBb5C