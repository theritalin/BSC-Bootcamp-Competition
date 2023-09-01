// EscrowContract.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EscrowContract is Ownable, ReentrancyGuard {
    //CONST
    mapping(address => uint256) public deposits;

    //EVENTS
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event FundsReleased(
        address indexed client,
        address indexed freelancer,
        uint256 amount
    );

    //FUNCTIONS

    //deposits the amount to the contract adress to escrow
    function deposit() external payable {
        require(msg.value > 0, "Amount must be greater than 0 in esrow");
        deposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    //only owner can release the funds to client for safety of the freelancers
    function withdraw(
        uint256 amount,
        address client
    ) external onlyOwner nonReentrant {
        require(
            amount > 0 && amount <= deposits[client],
            "Invalid withdrawal amount"
        );
        deposits[client] -= amount;
        payable(client).transfer(amount);
        emit Withdrawal(client, amount);
    }

    // Allows the freelancer to withdraw funds when job is done and client is satisfied
    function releaseFunds(
        address client,
        address freelancer,
        uint256 amount
    ) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            deposits[msg.sender] >= amount,
            "Insufficient funds in escrow for freelancer"
        );

        deposits[msg.sender] -= amount;
        payable(freelancer).transfer(amount);
        emit FundsReleased(client, freelancer, amount);
    }
}
