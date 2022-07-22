require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const API_URL = process.env.API_URL;
  const RINKEBY_API_URL = process.env.RINKEBY_API_URL;
  const PUBLIC_KEY = process.env.PUBLIC_KEY;

  const PRIVATE_KEY = process.env.PRIVATE_KEY;

  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

  const web3 = createAlchemyWeb3(API_URL);
  //const web3 = createAlchemyWeb3(RINKEBY_API_URL);

  const contract = require("../artifacts/contracts/SuperclusterNFT.sol/SuperclusterNFT.json");

  const contractAddress = "0x57E7546d4AdD5758a61C01b84f0858FA0752e940";

  const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

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

  //   "https://bafkreih4msosv74zxrxffbgysc7dztu4ficbxqxjvc5u563cbun7zu5xm4.ipfs.nftstorage.link/"

  wallet = "0x6eD68a1982ac2266ceB9C1907B629649aAd9AC20";
  // const wallets = [
  //   "0x5A7A9517f118dCCEfAFcB6AF99ADD30b904Ce9cb",
  //   "0xebFE9190D00d61cA7dBCf00A0Cfdc6AE8E1B5264",
  //   "0xE4475EF8717d14Bef6dCBAd55E41dE64a0cc8510",
  //   "0x6eD68a1982ac2266ceB9C1907B629649aAd9AC20",
  // ];

  //for (const wallet of wallets) {
  await mintNFT(
    wallet,
    "ipfs://bafkreih4msosv74zxrxffbgysc7dztu4ficbxqxjvc5u563cbun7zu5xm4"
  );
  //}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
