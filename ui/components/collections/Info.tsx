import { Box, Heading, Text, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

type InfoProps = {
  name: string;
  symbol: string;
} & BoxProps;

export const Info: FC<InfoProps> = ({ name, symbol, ...rest }) => {
  return (
    <Box {...rest}>
      <Heading as="h3" mb="0.5rem">
        {name}
      </Heading>
      <Text>Symbol: {symbol}</Text>
    </Box>
  );
};
