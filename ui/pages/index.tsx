import type { NextPage } from "next";
import { Box, BoxProps } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NFT Factory</title>
      </Head>
      <Box {...wrapperStyles}>
        <Header />
        <Main />
      </Box>
    </>
  );
};

const wrapperStyles: BoxProps = {
  w: "100%",
  h: "100%",
};

export default Home;
