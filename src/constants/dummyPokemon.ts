import {
  Move,
  PokemonDetail,
  PokemonType,
} from "components/pokemon/detail/query";

export const DUMMY_POKEMON: PokemonDetail = {
  name: "",
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  types: Array.from(Array<PokemonType>(2), (_, index) => ({
    slot: index,
    type: {
      name: `type-${index}`,
    },
  })),
  moves: Array.from(Array<Move>(10), (_, index) => ({
    move: {
      name: `move-${index}`,
    },
  })),
};
