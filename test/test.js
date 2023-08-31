// Import the necessary modules

const FreelanceDeMarket = artifacts.require("./FreelanceDeMarket");
const EscrowContract = artifacts.require("EscrowContract");

contract("FreelanceDeMarket", async (accounts) => {
  let freelanceDeMarketInstance;
  let escrowContractInstance;

  // Deploy a new instance of FreelanceDeMarket before each test
  beforeEach(async () => {
    escrowContractInstance = await EscrowContract.new();

    freelanceDeMarketInstance = await FreelanceDeMarket.new(
      escrowContractInstance.address
    );
  });

  //Test user registration
  it("should register a new user", async () => {
    const userName = "Alice";
    const userType = 0; // UserType.Client

    await freelanceDeMarketInstance.registerUser(userName, userType, {
      from: accounts[0],
    });

    const user = await freelanceDeMarketInstance.users(accounts[0]);

    assert.equal(user.name, userName, "User name not matching");
    assert.equal(user.userType, userType, "User type not matching");
  });

  //TESTING CREATING a PROJECT
  it("should create a project and initiate escrow", async () => {
    const freelancer = accounts[1];
    const amount = web3.utils.toWei("1", "ether"); // 1 ETH in Wei

    await freelanceDeMarketInstance.createProjectAndEscrow(freelancer, amount, {
      from: accounts[0],
      value: amount,
    });

    const project = await freelanceDeMarketInstance.projects(0);
    const escrowBalance = await web3.eth.getBalance(
      escrowContractInstance.address
    );

    assert.equal(project.client, accounts[0], "Incorrect client");
    assert.equal(project.freelancer, freelancer, "Incorrect freelancer");
    assert.equal(project.amount.toString(), amount, "Incorrect amount");
    assert.equal(
      project.fundsDeposited,
      true,
      "Funds should not be deposited yet"
    );
    assert.equal(escrowBalance.toString(), amount, "Incorrect escrow balance");
  });

  //TESTING RELEASE FUND
  it("should allow the owner to release funds", async () => {
    const depositAmount = web3.utils.toWei("1", "ether");
    const releaseAmount = web3.utils.toWei("1", "ether");

    await escrowContractInstance.deposit({
      from: accounts[0],
      value: depositAmount,
    });

    const escrowBalance = await web3.eth.getBalance(
      escrowContractInstance.address
    );

    const freelancerInitialBalance = await web3.eth.getBalance(accounts[1]);

    await escrowContractInstance.releaseFunds(
      accounts[0],
      accounts[1],
      releaseAmount,
      { from: accounts[0] }
    );

    const freelancerlastBalance = await web3.eth.getBalance(accounts[1]);
    const result = freelancerlastBalance - freelancerInitialBalance;
    assert.equal(result, releaseAmount, "Result isn't as expexted");
  });

  //WITHDRAW to CLIENT

  it("should withdraw to client by owner", async () => {
    const depositAmount = web3.utils.toWei("1", "ether");
    const releaseAmount = web3.utils.toWei("1", "ether");

    await escrowContractInstance.deposit({
      from: accounts[1],
      value: depositAmount,
    });
    const clientInitialBalance = await web3.eth.getBalance(accounts[1]);

    await escrowContractInstance.withdraw(depositAmount, accounts[1], {
      from: accounts[0],
    });

    const clientLastBalance = await web3.eth.getBalance(accounts[1]);

    const result = clientLastBalance - clientInitialBalance;

    assert.equal(depositAmount, result, "Result isn't as expected");
  });
});
