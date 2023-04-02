// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer, candidate1, candidate2, voter1, voter2] = await ethers.getSigners();

  const VoteContract = await hre.ethers.getContractFactory('VotingDappFactory');
  const voteContract = await VoteContract.deploy();

  await voteContract.deployed();

  console.log(`Deployed the Smart Contract at: ${voteContract.address}`)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
