import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

import SinglePokemon, { SinglePokemonProps } from "./SinglePokemon";

import { render } from "utils/test-utils";

jest.mock("next/image");
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

describe("SinglePokemon", () => {
  let expectedProps: SinglePokemonProps;
  beforeEach(() => {
    expectedProps = {
      pokemon: {
        id: 1,
        name: "bulbasaur",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
      isLoading: false,
    };
  });

  test("should render id, name, and image", () => {
    const { getByText, getByAltText } = render(
      <SinglePokemon {...expectedProps} />
    );
    const pokemonId = getByText(`#${expectedProps.pokemon.id}`);
    const pokemonName = getByText(expectedProps.pokemon.name);
    const pokemonImage = getByAltText(expectedProps.pokemon.name);

    expect(pokemonId).toBeVisible();
    expect(pokemonName).toBeVisible();
    expect(pokemonImage).toBeVisible();
  });
});
