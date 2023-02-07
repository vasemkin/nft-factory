import { expect } from "chai";
import { ethers, getNamedAccounts } from "hardhat";

import type { NFTFactory, NFTFactory__factory, Collection } from "../typechain";

const mockArgs = ["My Collection", "MCL"] as const;

describe("NFTFactory tests", function () {
    let nftFactory: NFTFactory;

    this.beforeAll(async () => {
        const contractFactory: NFTFactory__factory = await ethers.getContractFactory("NFTFactory");
        nftFactory = (await contractFactory.deploy()) as NFTFactory;
        await nftFactory.deployed();
    });

    describe("NFTFactory", () => {
        it("Emits CollectionCreated event", async () => {
            expect(await nftFactory.createCollection(...mockArgs)).to.emit(nftFactory, "CollectionCreated");
        });

        it("Created collection owner is the msg.sender", async () => {
            const { tester } = await getNamedAccounts();
            const signer = await ethers.getSigner(tester);
            const createTx = await nftFactory.connect(signer).createCollection(...mockArgs);
            const receipt = await createTx.wait();

            let collectionAddress = ethers.constants.AddressZero;

            for (const event of receipt.events!) {
                if (event.event === "CollectionCreated" && event.args?.collection) {
                    collectionAddress = event.args.collection;
                }
            }

            const collection: Collection = await ethers.getContractAt("Collection", collectionAddress);
            expect(await collection.owner()).to.eq(tester);
        });
    });
});
