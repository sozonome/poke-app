import { NetworkStatus, useQuery } from "@apollo/client";
import { Button, Grid, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import ListWrapper from "./components/ListWrapper";

import { DUMMY_POKEMONS } from "constants/dummyPokemons";
import { PokemonListInput, PokemonListRes, POKEMON_LIST } from "./query";

const PokemonList = () => {
  const router = useRouter();
  const {
    query: { offset },
  } = router;

  const { data, loading, error, networkStatus, refetch } = useQuery<
    PokemonListRes,
    PokemonListInput
  >(POKEMON_LIST, {
    variables: { limit: 20, offset: Number(offset as string) ?? 0 },
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
