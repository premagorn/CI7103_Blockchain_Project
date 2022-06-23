// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


contract Funding {

    uint public totalAmount;
    uint public currentAmount;
    address payable owner;

    constructor() payable {
        totalAmount = 1000 ether;
        currentAmount = 0 ether;
        owner = payable(msg.sender);
    }

    receive() external payable{}

    function fund() public payable {
        require(msg.value >= 0.1 ether, "Must be greater than 0.1 ETH");
        currentAmount += msg.value;
    }

    function withdraw() external payable { 
        require(msg.sender == owner,"You are not the owner!");
        require(currentAmount >= totalAmount, "Target amount not reached yet");
        owner.transfer(currentAmount);
        currentAmount = 0;
    }
}




