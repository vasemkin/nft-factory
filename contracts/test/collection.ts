import { expect } from "chai";
import { ethers, getNamedAccounts } from "hardhat";

import type { Collection, Collection__factory } from "../typechain";

const mockArgs = ["My Collection", "MCL"] as const;
// a random bape
const mockUri = "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/3";

describe("Collection tests", function () {
    let collection: Collection;

    this.beforeAll(async () => {
        const contractFactory: Collection__factory = await ethers.getContractFactory("Collection");
        collection = (await contractFactory.deploy(...mockArgs)) as Collection;
        await collection.deployed();
    });

    describe("ERC721", () => {
        it("The owner is the deployer", async () => {
            const { deployer } = await getNamedAccounts();
            expect(await collection.owner()).to.eq(deployer);
        });

        it("Emits TokenMinted event", async () => {
            const { deployer } = await getNamedAccounts();
            const tokenId = ethers.BigNumber.from("0");
            expect(await collection.safeMint(deployer, mockUri))
                .to.emit(collection, "TokenMinted")
                .withArgs(collection.address, deployer, tokenId, mockUri);
        });

        it("Works for a stranger wallet", async () => {
            const { tester, deployer } = await getNamedAccounts();
            const signer = await ethers.getSigner(tester);
            const contractFactory: Collection__factory = await ethers.getContractFactory("Collection");
            const contractFactoryStranger = contractFactory.connect(signer);
            const collec = (await contractFactoryStranger.deploy(...mockArgs)) as Collection;
            await collec.deployed();
            const collectionStranger = collec.connect(signer);
            await expect(collectionStranger.safeMint(tester, mockUri)).not.to.be.reverted;
            const tokenId = ethers.BigNumber.from("0");
            expect(await collection.safeMint(deployer, mockUri))
                .to.emit(collection, "TokenMinted")
                .withArgs(collection.address, deployer, tokenId, mockUri);
        });
    });
});
