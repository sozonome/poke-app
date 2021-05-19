import gql from "graphql-tag";

type PokemonListParam = {
  offset: number;
  limit: number;
};

export type PokemonListInput = Partial<PokemonListParam>;

export type PokemonItem = {
  name: string;
  image: string;
  id: number;
};

type PokemonListType = {
  count: number;
  next: string;
  previous: string;
  nextOffset: number;
  prevOffset: number;
  params: PokemonListParam;
  results: Array<PokemonItem>;
  status: boolean;
  message: string;
};

export type PokemonListRes = {
  pokemons: PokemonListType;
};

export const POKEMON_LIST = gql`
  query PokemonList($offset: Int, $limit: Int) {
    pokemons(offset: $offset, limit: $limit) {
      count
      next
      previous
      nextOffset
      prevOffset
      params
      results {
        name
        image
        id
      }
      status
      message
    }
  }
`;
