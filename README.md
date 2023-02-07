# NFT Factory Monorepo

## 🔧 Setting up Local Development

Required:

- [Node v16](https://nodejs.org/download/release/latest-v16.x/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/downloads)

This is an oversimplified monorepo.
The main config is the root of the folder. Start by filling it.

```bash
cp .env.example .env
```

Prepare the executables (advised to read their code before that)

```
chmod +x ./prepare.sh
chmod +x ./sync.sh
```

Prepare the artifact folders in UI and Backend projects:

```bash
./prepare.sh
```

In a separate terminal window build the smart contracts and start the hardhat network:

```bash
cd contracts/
yarn chain
```

In a separate terminal start the backend server:

```bash
cd backend/
yarn start:dev
```

In a separate terminal start UI server:

```bash
cd ui/
yarn dev
```

The project can be enjoyed in your browser, terminal, and Postman.

## Architecture

The app is written in
Smart contracts: [Solidity](https://soliditylang.org) and [Hardhat](https://hardhat.org/)
Backend: [NestJS](https://nestjs.com/)
UI: [React](https://reactjs.org/) and [NextJS](https://nextjs.org/).
