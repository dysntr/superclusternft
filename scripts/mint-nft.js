require("dotenv").config();
const { ethers } = require("hardhat");

const API_URL = process.env.API_URL;
const RINKEBY_API_URL = process.env.RINKEBY_API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

//const web3 = createAlchemyWeb3(API_URL);
const web3 = createAlchemyWeb3(RINKEBY_API_URL);

const contract = require("../artifacts/contracts/SuperclusterNFT.sol/SuperclusterNFT.json");

const contractAddress = "0x0b1921942c65c37C73143a677928998bf2259A28";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    // address account,
    // uint256 id,
    // uint256 amount,
    // bytes memory data
    data: nftContract.methods.safeMint(PUBLIC_KEY).encodeABI(),
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
mintNFT();
