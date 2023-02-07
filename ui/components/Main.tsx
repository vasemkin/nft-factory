import {
  Box,
  BoxProps,
  Button,
  Flex,
  Grid,
  GridProps,
  Input,
  InputProps,
  useToast,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { apiClient } from "../api/client";
import { useContracts } from "../hooks/useContracts";
import { Collection } from "./home/Collection";

export const Main: FC = () => {
  const toast = useToast();
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const { factory } = useContracts();

  const { isLoading, data, refetch } = useQuery("collections", async () => {
    return await apiClient.get("collections");
  });

  const toggleCreation = () => {
    setCreateOpen((prev) => !prev);
    setName("");
    setSymbol("");
  };

  const createCollection = async () => {
    const tx = await factory.createCollection(name, symbol);
    toast({ title: "Tx submitted to blockchain" });
    await tx.wait();
    toast({ title: "Tx confirmed!" });
    refetch();
  };

  return (
    <>
      <Box {...wrapperStyles}>
        {isLoading ? (
          <>loading...</>
        ) : (
          <Grid {...gridStyles}>
            <Button onClick={toggleCreation} w="fit-content">
              {createOpen ? "Close creation" : "Create new"}
            </Button>

            {createOpen && (
              <Box>
                <Input
                  {...nameInputProps}
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                />
                <Input
                  {...symbolInputProps}
                  value={symbol}
                  onChange={(evt) => setSymbol(evt.target.value)}
                />
                <Button size="sm" onClick={createCollection}>
                  Create collection
                </Button>
              </Box>
            )}

            {data?.data.map(({ name, address, symbol, id }: any) => (
              <Collection
                name={name}
                address={address}
                symbol={symbol}
                key={id}
              />
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

const nameInputProps: InputProps = {
  type: "text",
  placeholder: "Collection name",
  mb: ".5rem",
};

const symbolInputProps: InputProps = {
  type: "text",
  placeholder: "Collection symbol",
  mb: ".5rem",
};

export const wrapperStyles: BoxProps = {
  w: "100%",
  h: "100%",
  p: "2rem",
};

export const gridStyles: GridProps = {
  gridTemplateColumns: "1fr",
  gap: "1rem",
};
