require("dotenv").config();
const { ethers } = require("hardhat");

/// @notice code to mint nft for specific contract, user, with a URI.
/// contractAddress will need to modified to the NFT contract
/// wallet address and URI will need to be provided to use the mint function.
/// Example:
/// wallet = "0x6eD68a1982ac2266ceB9C1907B629649aAd9AC20";
/// await mintNFT(
///   wallet,
///   "ipfs://bafkreihvcifpkay3q7jzjqrdtrc34loqcw4iiquasl36xcpn3pj6dbla2y"
/// );

async function main() {
  const API_URL = process.env.API_URL;
  const RINKEBY_API_URL = process.env.RINKEBY_API_URL;
  const PUBLIC_KEY = process.env.PUBLIC_KEY;

  const PRIVATE_KEY = process.env.PRIVATE_KEY;

  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

  const web3 = createAlchemyWeb3(API_URL);
  //const web3 = createAlchemyWeb3(RINKEBY_API_URL);

  const contract = require("../artifacts/contracts/SuperclusterNFT.sol/SuperclusterNFT.json");

  // Green Warrior NFT Contract Address - 0x57E7546d4AdD5758a61C01b84f0858FA0752e940
  // Mandelbrot NFT Contract Address - 0xEE232b653c862A2d94EC66F7f2596307Bc483dBE
  // Galactic NFT Contract Address - 0xc9397648428436C6dd838bDaD2D5f484b80af7dA
  // Recipe guardian Contract Address - 0x8900A5Cc4235392d9981D4C1dD373f13d89962Bb
  const contractAddress = "0x8900A5Cc4235392d9981D4C1dD373f13d89962Bb";

  const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

  /// @notice a function to mint NFT with tokenURI to address address
  /// @param address the address that will receive the NFT
  /// @param tokenURI the NFT JSON file
  async function mintNFT(address, tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    // const accountNonce =
    //   "0x" + ((await web3.eth.getTransactionCount(PUBLIC_KEY)) + 1).toString(16);
    //the transaction
    console.log("nonce", nonce);
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      //nonce: accountNonce,
      gas: 500000,
      // address account,
      // uint256 id,
      // uint256 amount,
      // bytes memory data
      data: nftContract.methods.safeMint(address, tokenURI).encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    signPromise

      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
      })

      .catch((err) => {
        console.log(" Promise failed:", err);
      });
  }

  // List of team member wallets:
  // const wallets = [
  //   "0x5A7A9517f118dCCEfAFcB6AF99ADD30b904Ce9cb",
  //   "0xebFE9190D00d61cA7dBCf00A0Cfdc6AE8E1B5264",
  //   "0xE4475EF8717d14Bef6dCBAd55E41dE64a0cc8510",
  //   "0x6eD68a1982ac2266ceB9C1907B629649aAd9AC20",
  // ];

  // List of Supercluster NFT jsons:
  //Supercluster NFT - Green Warrior - "ipfs://bafkreih4msosv74zxrxffbgysc7dztu4ficbxqxjvc5u563cbun7zu5xm4"
  //Supercluster NFT - Mandelbrot Wizard - "ipfs://bafkreic23ytqfhkeoc5mwvpwlrl7m5q3m47cwkvjv7peenejxzlzeqswsy"
  //Supercluster NFT - Galactic Traveler - "ipfs://bafkreibdwudd4snhxuieck5nyq5ho6e5tohszbq47kn3uox7q7kkmcb2yq"
  //Supercluster NFT - Recipe Guardian - "ipfs://bafkreihvcifpkay3q7jzjqrdtrc34loqcw4iiquasl36xcpn3pj6dbla2y"

  //Mint a specific NFT for a wallet

  wallet = "0x6eD68a1982ac2266ceB9C1907B629649aAd9AC20";
  await mintNFT(
    wallet,
    "ipfs://bafkreihvcifpkay3q7jzjqrdtrc34loqcw4iiquasl36xcpn3pj6dbla2y"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
