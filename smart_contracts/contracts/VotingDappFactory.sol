// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './VotingDappDeployer.sol';
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract VotingDappFactory is VotingDappDeployer {
   // this will keep track of the total amount of times people have created votes. 
   uint256 public totalRounds;
   address public studio;
   uint public cost;


   constructor() {
      studio = msg.sender; 
      cost = 0.5 ether;
   }


   mapping(address => mapping(address => address)) canidateAddress;
   // mapping(address => address) canidateHistory;


   function createVote(
      address _firstC, 
      address _secondC
   ) payable public returns (address vote) {
      require(msg.value >= cost, 'Sorry you dont have enough ether');

      totalRounds++; 
      vote = deploy(_firstC, _secondC);


   }

}
