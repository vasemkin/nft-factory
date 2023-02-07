# NFT Factory UI

## 🔧 Setting up Local Development

Required:

- [Node v16](https://nodejs.org/download/release/latest-v16.x/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/downloads)

Make sure that:

- Contracts are built and deployed to a live localhost network (`contracts/yarn chain`)
- Artifacts and .env are synced (`home/sync.sh`)
- Backend is running

Install the deps and start a dev server:

```bash
$ yarn
$ yarn dev
```

The site is now running at `http://localhost:3332`!
Open the source code and start editing!
Make sure your Metamask chainId is 31337. It is 1337 by default.

## Architecture/Layout

The app is written in [React](https://reactjs.org/) and [NextJS](https://nextjs.org/).

The files/folder structure are a **WIP** and may contain some unused files. The project is rapidly evolving so please update this section if you see it is inaccurate!

```
./
├── app/          // App logic page
├── components/   // Reusable individual components
├── hooks/        // Custom hooks with common logic
├── pages/        // Page structure
├── deployments/  // ABIs and contract adresses
├── typechain/    // TypeScript interfaces for smart contracts
├── artifacts/    // Solc artifacts, ABIs
└── public/       // Static assets
```
