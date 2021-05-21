import { NetworkStatus, useQuery } from "@apollo/client";
import { Grid, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import ListWrapper from "./ListWrapper";

import { DUMMY_POKEMONS } from "constants/dummyPokemons";
import { PokemonListInput, PokemonListRes, POKEMON_LIST } from "./query";

const PokemonList = () => {
  const { data, loading, error, networkStatus, refetch } = useQuery<
    PokemonListRes,
    PokemonListInput
  >(POKEMON_LIST, {
    variables: { limit: 20, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  if (error)
    return (
      <Grid gap={4} marginY={20} textAlign="center">
        <Heading size="lg">Error</Heading>
        <Button onClick={() => refetch()}>Try Again</Button>
      </Grid>
    );

  return (
    <ListWrapper
      pokemons={data?.pokemons ?? DUMMY_POKEMONS}
      isLoading={loading || networkStatus === NetworkStatus.refetch}
    />
  );
};

export default PokemonList;
