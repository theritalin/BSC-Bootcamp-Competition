# Freelancer DeMarket DApp - README

Welcome to the **Freelancer DeMarket DApp** project repository! This DApp let the clients and freelancers to exchange safely through the blokchain.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Testing](#testing)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Freelancer DeMarket DApp** provides safely connections for clients who wants to do freelancers job. It also provides freelnacers to get their money safely with the power of blockchain.

## Features

- Project is listed in the frontend.
- Freelancers bids the project.
- Client accepts the price.
- Client creates the project and deposit the amount on-chain.
- Freelancer uploads the project and send it to client.
- Client accepts the project the freelancer uploaded and money will go the freelancers account on chain.

## Getting Started

Follow these steps to set up the project locally and start participating in web3 auctions.

### Prerequisites

1. Node.js: Ensure Node.js is installed. Download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

```bash
  git clone [https://github.com/theritalin/BSC-Bootcamp-Competition.git]
```

2. Navigate to the project directory:

```bash
  cd BSC-Bootcamp-Competition
```

3. Install required npm packages:

```bash
 npm install
```

## Usage

1. Start the development server:

```bash
 npm start
```

2. Open your web browser and navigate to `http://localhost:3000` to access the DApp.

3. Connect your BSC wallet (e.g., MetaMask) to the DApp.

## Smart Contracts

The smart contracts in this project facilitate the auction process. They handle resgister account, creatiing project, and releasing funds. These contracts are deployed on the BSC TESTNET.

- `EscrowContract.sol`: Responsible for deposit and paying funds.
- `FreelanceDeMarket.sol`: Manages regisration, creating of projects.

## Testing

Smart contract tests are located in the `test` folder. These tests ensure the correct functioning of the smart contract. To run the tests, follow these steps:

1. Open a terminal in the project directory.
2. Run the following command to execute the tests:

```bash
npm run test
```

This command will initiate the smart contract tests and display the results in the terminal.

![image](https://github.com/theritalin/BSC-Bootcamp-Competition/blob/main/assets/test.png)


## Frontend

The DApp frontend iis going to be built using React.js

## Contributing

Contributions to this project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Make changes and test thoroughly.
4. Commit with clear and concise messages.
5. Push changes to your fork.
6. Submit a pull request describing your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for your interest in the Freelancer DeMarket DApp project! For questions or suggestions, reach out to us or open an issue on [GitHub](https://github.com/theritalin/BSC-Bootcamp-Competition). Happy bidding on the blockchain! 🚀
