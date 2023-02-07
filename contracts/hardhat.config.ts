import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("spawn-collection", "Creates a new NFT collection", async (taskArgs, hre) => {
    const factoryAddress = (await hre.deployments.get("NFTFactory")).address;
    console.log(`NFTFactory address: ${factoryAddress}`);
    const nftFactory = await hre.ethers.getContractAt("NFTFactory", factoryAddress);
    const tx = await nftFactory.createCollection("MyCollection", "MCL");
    const receipt = await tx.wait();

    for (const event of receipt.events!) {
        if (event.event === "CollectionCreated") {
            console.log("Received CollectionCreated event with args:");
            console.log(event.args);
        }
    }
});

task("mint-nft", "Mint a token")
    .addParam("address", "collection address")
    .setAction(async (taskArgs: { address: string }, hre) => {
        const { deployer } = await hre.getNamedAccounts();
        const address = taskArgs.address;
        const collection = await hre.ethers.getContractAt("Collection", address);
        const tx = await collection.safeMint(deployer, "ipfs://");
        const receipt = await tx.wait();

        for (const event of receipt.events!) {
            if (event.event === "TokenMinted") {
                console.log("Received TokenMinted event with args:");
                console.log(event.args);
            }
        }
    });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    namedAccounts: {
        deployer: process.env["DEPLOYER_ADDRESS"] || "",
        tester: process.env["DEPLOYER_ADDRESS"] || "",
    },
    networks: {
        hardhat: {
            accounts: [
                {
                    privateKey: process.env["DEPLOYER_PK"] || "",
                    balance: "10000000000000000000000",
                },
                {
                    privateKey: process.env["TESTER_PK"] || "",
                    balance: "10000000000000000000000",
                },
            ],
            forking: {
                enabled: true,
                url: process.env["TESTNET_RPC"] || "",
            },
        },
        testnet: {
            url: process.env["TESTNET_RPC"] || "",
            accounts: process.env.DEPLOYER_PK !== undefined ? [process.env.DEPLOYER_PK] : [],
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

export default config;
