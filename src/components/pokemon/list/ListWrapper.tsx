import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import Icon from "@chakra-ui/icon";
import { useContext } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";

import SinglePokemon from "./SinglePokemon";
import AccessibleLink from "components/AccessibleLink";

import { CaughtPokemonContext } from "components/provider/CaughtPokemonProvider";

import { PokemonListType } from "./query";

type ListWrapperProps = {
  pokemons: PokemonListType;
  isLoading?: boolean;
};

const ListWrapper = ({ pokemons, isLoading }: ListWrapperProps) => {
  const { totalOwned } = useContext(CaughtPokemonContext);

  return (
    <Grid gap={8}>
      <Skeleton isLoaded={!isLoading}>
        <AccessibleLink href="/pokedex/owned">
          <Flex
            width="100%"
            boxShadow="0px 0px 15px 3px rgba(140,140,140,0.2)"
            padding={4}
            borderRadius={24}
            alignItems="center"
          >
            <Box>
              <Heading size="xs">My Pokemon</Heading>
              <Text fontSize="sm">Owned Total: {totalOwned}</Text>
            </Box>

            <Icon
              fontSize="2xl"
              marginLeft="auto"
              children={<AiOutlineCaretRight />}
            />
          </Flex>
        </AccessibleLink>
      </Skeleton>

      <Grid
        templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        gap={8}
      >
        {pokemons.results.map((pokemon) => (
          <SinglePokemon
            isLoading={isLoading}
            pokemon={pokemon}
            key={pokemon.name}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ListWrapper;
