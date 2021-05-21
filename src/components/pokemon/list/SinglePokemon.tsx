import { Grid, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import Image from "next/image";

import AccessibleLink from "components/AccessibleLink";

import { PokemonItem } from "./query";

type SinglePokemonProps = {
  pokemon: PokemonItem;
  isLoading?: boolean;
};

const SinglePokemon = ({ pokemon, isLoading }: SinglePokemonProps) => {
  return (
    <AccessibleLink href={!isLoading ? `/pokedex/${pokemon.name}` : "/"}>
      <Grid
        borderRadius={24}
        textAlign="center"
        padding={4}
        boxShadow="0px 0px 15px 3px rgba(140,140,140,0.2)"
        gap={2}
        key={pokemon.name}
      >
        <Skeleton isLoaded={!isLoading} fadeDuration={1}>
          <Image
            src={pokemon.image}
            layout="responsive"
            width={200}
            height={200}
          />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} fadeDuration={1}>
          <Text fontWeight="semibold">{pokemon.name}</Text>
        </Skeleton>
      </Grid>
    </AccessibleLink>
  );
};

export default SinglePokemon;
