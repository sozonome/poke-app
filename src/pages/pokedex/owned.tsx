import { Heading } from "@chakra-ui/layout";

import OwnedPokemonList from "components/pokemon/owned";

const OwnedPokemons = () => {
  return (
    <>
      <Heading textAlign="center" marginY={8}>
        My Pokemon
      </Heading>
      <OwnedPokemonList />
    </>
  );
};

export default OwnedPokemons;
