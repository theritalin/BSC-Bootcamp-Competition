// const fs = require("fs");

// const arb = artifacts.require("./FreelanceDeMarket");

// module.exports = async function (deployer) {
//   await deployer.deploy(arb);

//   const instance = await arb.deployed();

//   let arbAdress = await instance.address;

//   console.log("arbAdress = ", arbAdress);

//   let config = `export const arbAdress = ${arbAdress} `;

//   let data = JSON.stringify(config);

//   fs.writeFileSync("config.js", JSON.parse(data));
// };

const FreelanceDeMarket = artifacts.require("FreelanceDeMarket");
const EscrowContract = artifacts.require("EscrowContract");

module.exports = function (deployer) {
  deployer.deploy(EscrowContract).then(() => {
    return deployer.deploy(FreelanceDeMarket, EscrowContract.address);
  });
};
