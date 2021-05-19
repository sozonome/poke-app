import { Box, Link as ChakraLink, Text } from "@chakra-ui/layout";
import Image from "next/image";
import Link from "next/link";

import { PokemonItem } from "./query";

type SinglePokemonProps = {
  pokemon: PokemonItem;
};

const SinglePokemon = ({ pokemon }: SinglePokemonProps) => {
  return (
    <Link href={`/pokedex/${pokemon.name}`} passHref>
      <ChakraLink>
        <Box
          borderRadius={24}
          textAlign="center"
          padding={4}
          boxShadow="0px 0px 15px 3px rgba(140,140,140,0.2)"
          key={pokemon.name}
        >
          <Image
            src={pokemon.image}
            layout="responsive"
            width={200}
            height={200}
          />
          <Text fontWeight="semibold">{pokemon.name}</Text>
        </Box>
      </ChakraLink>
    </Link>
  );
};

export default SinglePokemon;