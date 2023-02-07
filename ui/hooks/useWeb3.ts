import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { BigNumber, providers } from "ethers";

export const useWeb3 = () => {
  const [web3Modal, setWeb3Modal] = useState<null | Web3Modal>(null);
  const [address, setAddress] = useState("");
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState<any>(null);
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from("0"));

  useEffect(() => {
    const providerOptions = {};

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "mainnet",
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      setConnected(true);

      const getAddress = async () => {
        const provider = await web3Modal.connect();
        const ethersProvider = new providers.Web3Provider(provider);
        const userAddress = await ethersProvider.getSigner().getAddress();
        setAddress(userAddress);
        setProvider(ethersProvider);
        const eths = await ethersProvider.getBalance(userAddress);
        setBalance(eths);
      };

      getAddress();
    }
  }, [web3Modal]);

  async function connectWallet() {
    if (!!web3Modal) {
      const provider = await web3Modal.connect();
      const ethersProvider = new providers.Web3Provider(provider);
      const userAddress = await ethersProvider.getSigner().getAddress();
      setAddress(userAddress);
      setProvider(ethersProvider);
    }

    setConnected(true);
  }

  async function disconnect() {
    if (!!web3Modal) {
      await web3Modal.clearCachedProvider();
    }

    setConnected(false);
    setAddress("");
  }

  return {
    connectWallet,
    connected,
    disconnect,
    address,
    web3Modal,
    provider,
    setWeb3Modal,
    balance,
  };
};
