require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { RINKEBY_API_URL, API_URL, PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    rinkeby: {
      url: RINKEBY_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
