import { Grid, Link, Text } from "@chakra-ui/layout";
import Image from "next/image";

import { PokemonItem } from "./query";
import { Skeleton } from "@chakra-ui/skeleton";
import { useRouter } from "next/router";

type SinglePokemonProps = {
  pokemon: PokemonItem;
  isLoading?: boolean;
};

const SinglePokemon = ({ pokemon, isLoading }: SinglePokemonProps) => {
  const router = useRouter();

  const handleClick = () =>
    !isLoading && router.push(`/pokedex/${pokemon.name}`);

  return (
    <Link onClick={handleClick}>
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
    </Link>
  );
};

export default SinglePokemon;
