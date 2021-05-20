import { useQuery } from "@apollo/client";

import ListWrapper from "./ListWrapper";

import { DUMMY_POKEMONS } from "constants/dummyPokemons";
import { PokemonListInput, PokemonListRes, POKEMON_LIST } from "./query";

const PokemonList = () => {
  const { data, loading, error } = useQuery<PokemonListRes, PokemonListInput>(
    POKEMON_LIST,
    {
      variables: { limit: 20, offset: 0 },
    }
  );

  if (error) return <div>Error</div>;

  return (
    <ListWrapper
      pokemons={data?.pokemons ?? DUMMY_POKEMONS}
      isLoading={loading}
    />
  );
};

export default PokemonList;
