const EscrowContract = artifacts.require("EscrowContract");

module.exports = function (deployer) {
  deployer.deploy(EscrowContract);
};
