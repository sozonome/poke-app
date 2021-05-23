import { Grid, Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";

import SinglePokemon from "./SinglePokemon";
import PageNavButtons from "./PageNavButtons";
import OwnedInfo from "./OwnedInfo";

import { PokemonListType } from "../query";

type ListWrapperProps = {
  pokemons: PokemonListType;
  isLoading?: boolean;
};

const ListWrapper = ({ pokemons, isLoading }: ListWrapperProps) => {
  const router = useRouter();

  const handleChangePage = (type: "next" | "prev") => () => {
    if (type === "next") {
      return router.push(`/?offset=${pokemons.nextOffset}`);
    }
    return router.push(`/?offset=${pokemons.prevOffset}`);
  };

  return (
    <Grid gap={8}>
      <OwnedInfo />

      <Grid gap={2}>
        <Heading
          bgGradient="linear(to-br, yellow.400, orange.300)"
          bgClip="text"
        >
          Pokedex
        </Heading>
        <PageNavButtons
          isLoading={isLoading}
          prevDisabled={!pokemons.previous}
          nextDisabled={!pokemons.next}
          handleChangePage={handleChangePage}
        />

        <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={8}>
          {pokemons.results.map((pokemon) => (
            <SinglePokemon
              isLoading={isLoading}
              pokemon={pokemon}
              key={pokemon.name}
            />
          ))}
        </Grid>

        <PageNavButtons
          isLoading={isLoading}
          prevDisabled={!pokemons.previous}
          nextDisabled={!pokemons.next}
          handleChangePage={handleChangePage}
        />
      </Grid>
    </Grid>
  );
};

export default ListWrapper;
