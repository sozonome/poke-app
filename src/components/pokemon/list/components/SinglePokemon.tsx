import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import Image from "next/image";

import AccessibleLink from "components/AccessibleLink";

import { PokemonItem } from "../query";

import { textGradientStyle } from "styles/textGradient";
import { cardStyle } from "styles/card";

type SinglePokemonProps = {
  pokemon: PokemonItem;
  isLoading?: boolean;
};

const SinglePokemon = ({ pokemon, isLoading }: SinglePokemonProps) => {
  return (
    <AccessibleLink href={!isLoading ? `/pokedex/${pokemon.name}` : "/"}>
      <Flex
        alignItems="center"
        gridGap={4}
        bgGradient="linear(to-br, yellow.400, orange.300)"
        height="full"
        {...cardStyle}
      >
        <Skeleton isLoaded={!isLoading} fadeDuration={1}>
          <Flex>
            <Heading
              wordBreak="break-word"
              marginBottom={2}
              filter="drop-shadow(0 0 12px #FFFFFF)"
              {...textGradientStyle}
            >
              {pokemon.name}
            </Heading>
          </Flex>
          <Text fontWeight="bold" fontSize="md" opacity={0.3} color="black">
            #{pokemon.id}
          </Text>
        </Skeleton>

        <Skeleton marginLeft="auto" isLoaded={!isLoading} fadeDuration={1}>
          <Box
            width={[84, 100]}
            height={[84, 100]}
            filter="drop-shadow(0 0 12px #A4A4A4)"
          >
            <Image
              src={pokemon.image}
              layout="responsive"
              width="100%"
              height="100%"
            />
          </Box>
        </Skeleton>
      </Flex>
    </AccessibleLink>
  );
};

export default SinglePokemon;
