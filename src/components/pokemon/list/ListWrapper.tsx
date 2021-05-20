import { Box, Grid, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

import SinglePokemon from "./SinglePokemon";

import { PokemonListType } from "./query";

type ListWrapperProps = {
  pokemons: PokemonListType;
  isLoading?: boolean;
};

const ListWrapper = ({ pokemons, isLoading }: ListWrapperProps) => {
  return (
    <Grid gap={8}>
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

      <Skeleton isLoaded={!isLoading}>
        <Box textAlign="center">
          <Text>Count: {pokemons?.count}</Text>
        </Box>
      </Skeleton>
    </Grid>
  );
};

export default ListWrapper;
