import { Box, BoxProps, Button, Text, TextProps } from "@chakra-ui/react";
import { ethers } from "ethers";
import { FC } from "react";
import { useWeb3 } from "../hooks/useWeb3";

export const Header: FC = () => {
  const { connectWallet, disconnect, connected, address, balance } = useWeb3();

  return (
    <Box {...wrapperStyles}>
      <Box>
        {connected ? (
          <Button onClick={disconnect}>Disconnect</Button>
        ) : (
          <Button onClick={connectWallet}>Connect wallet</Button>
        )}
      </Box>

      <Box {...userStyles}>
        <Box>{address}</Box>
        <Text {...textStyles}>
          ETH balance: {ethers.utils.formatEther(balance)}
        </Text>
      </Box>
    </Box>
  );
};

const userStyles: BoxProps = {
  display: "flex",
  flexDir: "column",
  alignItems: "flex-end",
};

const wrapperStyles: BoxProps = {
  p: "2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const textStyles: TextProps = {
  fontSize: "12px",
  lineHeight: "14px",
  color: "#787878",
};
