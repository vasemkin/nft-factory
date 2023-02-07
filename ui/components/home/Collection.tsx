import { Box, BoxProps, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface CollectionProps {
  name: string;
  symbol: string;
  address: string;
}

export const Collection: FC<CollectionProps> = ({ name, symbol, address }) => {
  return (
    <Box {...collectionStyles}>
      <Text>name: {name}</Text>
      <Text>symbol: {symbol}</Text>
      <Text>address: {address}</Text>
      <Link href={`/collections/${address}`}>
        <Text color="GrayText" cursor="pointer">
          Visit
        </Text>
      </Link>
    </Box>
  );
};

const collectionStyles = {
  bg: "#faf2f2",
  borderRadius: ".5rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
} as BoxProps;
