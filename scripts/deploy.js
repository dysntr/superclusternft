// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// command to deploy: npx hardhat --network matic run scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const SuperclusterNFT = await ethers.getContractFactory("SuperclusterNFT");

  // Start deployment, returning a promise that resolves to a contract object

  const superclusterNFT = await SuperclusterNFT.deploy();

  await superclusterNFT.deployed();

  console.log("Contract deployed to address:", superclusterNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
