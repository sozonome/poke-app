import { PokemonItem, PokemonListType } from "components/pokemon/list/query";

export const DUMMY_POKEMONS: PokemonListType = {
  next: "0",
  previous: "0",
  params: {
    limit: 0,
    offset: 0,
  },
  nextOffset: 0,
  prevOffset: 0,
  results: Array.from(Array<PokemonItem>(20), (_, index) => ({
    name: `pokemon-${index + 1}`,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    id: index + 1,
  })),
  count: 0,
};
