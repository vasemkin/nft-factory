import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

import type { Collection } from "../typechain";

import collectionABI from "../artifacts/contracts/Collection.sol/Collection.json";

export const useCollection = (address: string) => {
  const { provider } = useWeb3();

  //@ts-ignore
  const [collection, setCollection] = useState<Collection>(null);

  useEffect(() => {
    if (!!provider) {
      const logic = async () => {
        const signer = await provider.getSigner();

        const clct = new ethers.Contract(address, collectionABI.abi, signer);
        const collectionSigned = (await clct.connect(signer)) as Collection;
        setCollection(collectionSigned);
      };

      logic();
    }
  }, [provider]);

  return { collection };
};
