import gql from "graphql-tag";

export type PokemonDetailInput = {
  name: string;
};

type SpriteImage = {
  front_default: string;
};

export type Move = {
  move: {
    name: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
  };
};

export type PokemonDetail = {
  name: string;
  sprites: SpriteImage;
  moves: Array<Move>;
  types: Array<PokemonType>;
};

export type PokemonDetailRes = {
  pokemon: PokemonDetail;
};

export const POKEMON_DETAIL = gql`
  query PokemonDetail($name: String!) {
    pokemon(name: $name) {
      name
      sprites {
        front_default
        front_female
      }
      moves {
        move {
          name
        }
      }
      types {
        slot
        type {
          name
        }
      }
    }
  }
`;
