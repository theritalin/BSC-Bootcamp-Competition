// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./EscrowContract.sol";

import "@ganache/console.log/console.sol";

contract FreelanceDeMarket is Ownable, ReentrancyGuard {
    //Tanımlamalar
    enum UserType {
        Client,
        Freelancer
    }

    mapping(address => uint256) public deposits;

    EscrowContract public escrowContract; // Reference to the EscrowContract

    //STRUCTURES
    struct User {
        string name;
        UserType userType;
        uint256 reputation;
    }

    struct Project {
        address client;
        address freelancer;
        uint256 amount;
        bool fundsDeposited;
    }

    //CONSTANT

    mapping(address => User) public users;
    mapping(uint256 => Project) public projects;
    
    uint256 public projectCount;

    //EVENTS
    event UserRegistered(
        address indexed userAddress,
        UserType userType,
        string name
    );

    event ReputationUpdated(address indexed userAddress, uint256 newReputation);

    event ProjectCreated(
        uint256 projectId,
        address client,
        address freelancer,
        uint256 amount
    );

    //CONSTRUCTOR
    constructor(address _escrowContractAddress) Ownable() {
        escrowContract = EscrowContract(_escrowContractAddress); // Set the EscrowContract reference
    }

    //FUNCTIONS


    // Create a project and initiate escrow
    function createProjectAndEscrow(
        address _freelancer,
        uint256 _amount
    ) external payable nonReentrant {
        require(_amount > 0, "Amount must be greater than 0 in freelance");

        uint256 projectId = projectCount;

        projects[projectId] = Project({
            client: msg.sender,
            freelancer: _freelancer,
            amount: _amount,
            fundsDeposited: false
        });

        // Transfer funds to escrow

        escrowContract.deposit{value: _amount}();
        deposits[msg.sender] += msg.value;
        projects[projectId].fundsDeposited = true;
        projectCount++;

        emit ProjectCreated(projectId, msg.sender, _freelancer, _amount);
    }

    //Register a user whether it is a client or freelancer
    function registerUser(
        string memory _name,
        UserType _userType
    ) external nonReentrant {
        require(bytes(_name).length > 0, "Name must not be empty");
        require(
            users[msg.sender].userType == UserType(0),
            "User is already registered"
        );

        users[msg.sender] = User({
            name: _name,
            userType: _userType,
            reputation: 0
        });

        emit UserRegistered(msg.sender, _userType, _name);
    }
}
