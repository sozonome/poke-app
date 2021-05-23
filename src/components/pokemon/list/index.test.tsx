import { render } from "utils/test-utils";
import { MockedProvider } from "@apollo/client/testing";

import PokemonList from "./index";

import { DUMMY_POKEMONS } from "constants/dummyPokemons";
import { POKEMON_LIST } from "./query";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

const mocks = [
  {
    request: {
      query: POKEMON_LIST,
      variables: {
        offset: 0,
        limit: 20,
      },
    },
    result: {
      data: {
        pokemons: DUMMY_POKEMONS,
      },
    },
  },
];

jest.mock(
  "next/image",
  () =>
    ({
      src,
      alt,
    }: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >) =>
      <img src={src} alt={alt} />
);

describe("PokemonList", () => {
  test("should render list of pokemon and owned pokemon", () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonList />
      </MockedProvider>
    );

    const pokemon1 = getByText(`pokemon-1`);
    const pokemon2 = getByText(`pokemon-2`);
    const ownedText = getByText(`owned:`);
    const ownedPokemon = getByText(`0`);

    expect(pokemon1).toBeVisible();
    expect(pokemon2).toBeVisible();
    expect(ownedText).toBeVisible();
    expect(ownedPokemon).toBeVisible();
  });
});
