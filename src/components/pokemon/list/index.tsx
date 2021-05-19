import { useQuery } from "@apollo/client";
import { Box, Grid, Text } from "@chakra-ui/layout";
import Image from "next/image";
import SinglePokemon from "./SinglePokemon";

import { PokemonListParam, PokemonListRes, POKEMON_LIST } from "./query";

const PokemonList = () => {
  const { data, loading, error } = useQuery<PokemonListRes, PokemonListParam>(
    POKEMON_LIST,
    { variables: { limit: 20, offset: 0 } }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return data ? (
    <Grid gap={8}>
      <Grid
        templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        gap={8}
      >
        {data.pokemons.results.map((pokemon) => (
          <SinglePokemon pokemon={pokemon} key={pokemon.name} />
        ))}
      </Grid>

      <Box textAlign="center">
        <Text>Count: {data.pokemons.count}</Text>
      </Box>
    </Grid>
  ) : null;
};

export default PokemonList;
