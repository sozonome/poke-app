import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiOutlineCaretLeft } from "react-icons/ai";

import ListWrapper from "./components/ListWrapper";

import { CaughtPokemonContext } from "components/provider/CaughtPokemonProvider";

const OwnedPokemonList = () => {
  const router = useRouter();
  const { totalOwned, isLoadingPokemons } = useContext(CaughtPokemonContext);

  const handleBack = () =>
    history.length > 2 ? router.back() : router.push("/");

  const routeToPokemonList = () => router.push("/");

  return (
    <Grid gap={8}>
      <Flex>
        <Button onClick={handleBack} leftIcon={<AiOutlineCaretLeft />}>
          back
        </Button>
      </Flex>

      <Heading textAlign="center">My Pokemon</Heading>

      <Skeleton isLoaded={!isLoadingPokemons} display="grid" gridGap={8}>
        {totalOwned > 0 ? (
          <ListWrapper />
        ) : (
          <Box textAlign="center">
            <Text marginBottom={4}>You haven't catched any pokemon yet.</Text>
            <Button colorScheme="orange" onClick={routeToPokemonList}>
              catch pokemon
            </Button>
          </Box>
        )}
      </Skeleton>
    </Grid>
  );
};

export default OwnedPokemonList;
