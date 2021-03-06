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

export type PokemonAbility = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};

export type PokemonDetail = {
  id: number;
  name: string;
  sprites: SpriteImage;
  moves: Array<Move>;
  types: Array<PokemonType>;
  abilities: Array<PokemonAbility>;
  weight: number;
};

export type PokemonDetailRes = {
  pokemon: PokemonDetail;
};

export const POKEMON_DETAIL = gql`
  query PokemonDetail($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
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
      abilities {
        ability {
          name
        }
        is_hidden
      }
      weight
    }
  }
`;
