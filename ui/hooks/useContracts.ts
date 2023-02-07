import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

import type { NFTFactory } from "../typechain";

import factoryDeployment from "../deployments/localhost/NFTFactory.json";
import factoryABI from "../artifacts/contracts/NFTFactory.sol/NFTFactory.json";

export const useContracts = () => {
  const { provider, connectWallet, address } = useWeb3();

  //@ts-ignore
  const [factory, setFactory] = useState<NFTFactory>(null);

  useEffect(() => {
    if (!!provider) {
      const logic = async () => {
        const signer = await provider.getSigner();

        const fct = new ethers.Contract(
          factoryDeployment.address,
          factoryABI.abi,
          signer
        );
        const factorySigned = (await fct.connect(signer)) as NFTFactory;
        setFactory(factorySigned);
      };

      logic();
    }
  }, [provider]);

  return { factory };
};
