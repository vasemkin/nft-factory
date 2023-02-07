import type { NextPage } from "next";
import {
  Box,
  BoxProps,
  Button,
  Grid,
  Input,
  InputProps,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { apiClient } from "../../api/client";
import { Info } from "../../components/collections/Info";
import { useCollection } from "../../hooks/useCollection";
import { useWeb3 } from "../../hooks/useWeb3";
import Link from "next/link";
import Head from "next/head";

const GoHome: FC = () => {
  return (
    <Box mt="1rem">
      <Link href={"/"}>
        <Text color="GrayText" cursor="pointer">
          Go home
        </Text>
      </Link>
    </Box>
  );
};

const Collection: NextPage = () => {
  const [mintOpen, setMintOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [metadata, setMetadata] = useState<string>("");
  const { address: userWallet } = useWeb3();

  const router = useRouter();
  const { addr } = router.query;
  const toast = useToast();

  const { isLoading, data, isError } = useQuery("get-collection", async () => {
    return apiClient.get(`collections/address/${addr}`);
  });

  const { data: tokenData, refetch: refetchTokens } = useQuery(
    "get-tokens",
    async () => {
      return apiClient.get(`tokens/by-collection/${addr}`);
    }
  );

  const toggleMint = () => {
    setMintOpen((prev) => !prev);
    setTo("");
    setMetadata("");
  };

  useEffect(() => {
    if (Array.isArray(addr)) {
      setAddress(addr[0]);
    }

    if (typeof addr === "string") {
      setAddress(addr);
    }
  }, [addr]);

  const { collection } = useCollection(address);

  if (isLoading) {
    <>
      <Head>
        <title>Collections</title>
      </Head>
      <Box {...wrapperStyles}>
        <Header />
        <Box {...mainStyles}>
          <Text>loading...</Text>
          <GoHome />
        </Box>
      </Box>
    </>;
  }

  if (isError || data?.data.length === 0) {
    return (
      <>
        <Head>
          <title>Collections</title>
        </Head>
        <Box {...wrapperStyles}>
          <Header />
          <Box {...mainStyles}>
            <Text>No collection created with this SC at {addr} address.</Text>
            <GoHome />
          </Box>
        </Box>
      </>
    );
  }

  const { name, symbol } = data?.data?.[0] || { name: "", symbol: "" };

  const insertMe = () => {
    setTo(userWallet);
  };

  const insertBape = () => {
    setMetadata(
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/3"
    );
  };

  const mintNFT = async () => {
    const tx = await collection.safeMint(to, metadata);
    toast({
      title: "Transaction sumbitted",
    });
    await tx.wait();
    toast({
      title: "Transaction confirmed",
    });

    refetchTokens();
  };

  return (
    <>
      <Head>
        <title>Collections</title>
      </Head>
      <Box {...wrapperStyles}>
        <Header />
        <Box {...mainStyles}>
          <Info name={name} symbol={symbol} mb="1rem" />
          <Button onClick={toggleMint} mb="0.5rem" size="md">
            {mintOpen ? "Close Mint" : "Open Mint"}
          </Button>
          {mintOpen && (
            <Box>
              <Box display="flex" mb="0.5rem">
                <Button size="xs" mr="0.5rem" onClick={insertMe}>
                  Insert my address
                </Button>
                <Button size="xs" onClick={insertBape}>
                  Insert reference metadata
                </Button>
              </Box>

              <Input
                {...toInputProps}
                value={to}
                onChange={(evt) => setTo(evt.target.value)}
              />
              <Input
                {...mtdInputProps}
                value={metadata}
                onChange={(evt) => setMetadata(evt.target.value)}
              />
              <Button size="sm" onClick={mintNFT}>
                Mint
              </Button>
            </Box>
          )}

          {tokenData?.data?.length !== 0 && (
            <Grid gridTemplateColumns="1fr" gap="1rem" mt="1rem">
              {tokenData?.data.map(
                ({ recepient, tokenId, tokenUri }: any, i: number) => (
                  <Box
                    key={`token-${i}`}
                    bg="gray.100"
                    padding="1rem"
                    borderRadius=".5rem"
                  >
                    <Text>tokenId: {tokenId.hex}</Text>
                    <Text>owner: {recepient}</Text>
                    <Text>
                      metadata: <Link href={tokenUri}>{tokenUri}</Link>
                    </Text>
                  </Box>
                )
              )}
            </Grid>
          )}
          <GoHome />
        </Box>
      </Box>
    </>
  );
};

const toInputProps: InputProps = {
  type: "text",
  placeholder: "Mint to:",
  mb: "0.5rem",
};

const mtdInputProps: InputProps = {
  type: "text",
  placeholder: "Metadata",
  mb: "0.5rem",
};

const wrapperStyles: BoxProps = {
  w: "100%",
  h: "100%",
};

const mainStyles: BoxProps = {
  p: "2rem",
};

export default Collection;
