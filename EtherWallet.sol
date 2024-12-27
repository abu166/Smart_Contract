// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherWallet {
    address public owner;

    constructor() {
        owner = msg.sender; // Set the deployer as the owner
    }

    // Function to receive Ether
    receive() external payable {}

    // Check the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Withdraw Ether (only owner can call)
    function withdrawAll() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
