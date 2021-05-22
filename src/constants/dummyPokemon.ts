import {
  Move,
  PokemonAbility,
  PokemonDetail,
  PokemonType,
} from "components/pokemon/detail/query";

export const DUMMY_POKEMON: PokemonDetail = {
  id: 1,
  name: "",
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
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
  abilities: Array.from(Array<PokemonAbility>(4), (_, index) => ({
    ability: {
      name: `ability-${index}`,
    },
    is_hidden: false,
  })),
  weight: 60,
};
