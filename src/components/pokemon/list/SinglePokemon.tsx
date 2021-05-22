import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Skeleton } from "@chakra-ui/skeleton";
import Image from "next/image";

import AccessibleLink from "components/AccessibleLink";

import { PokemonItem } from "./query";

type SinglePokemonProps = {
  pokemon: PokemonItem;
  isLoading?: boolean;
};

const SinglePokemon = ({ pokemon, isLoading }: SinglePokemonProps) => {
  const textBgColor = useColorModeValue(
    "linear(to-br, blue.600, red.600)",
    "linear(to-br, red.600, blue.600)"
  );
  const headingSize = useBreakpointValue({
    sm: "lg",
    lg: "lg",
  });

  return (
    <AccessibleLink href={!isLoading ? `/pokedex/${pokemon.name}` : "/"}>
      <Flex
        borderRadius={24}
        padding={4}
        alignItems="center"
        gridGap={4}
        boxShadow="0px 0px 15px 3px rgba(140,140,140,0.2)"
        bgGradient="linear(to-br, yellow.400, orange.300)"
      >
        <Skeleton isLoaded={!isLoading} fadeDuration={1}>
          <Heading
            wordBreak="break-word"
            size={headingSize}
            bgGradient={textBgColor}
            filter="drop-shadow(0 0 12px #FFFFFF)"
            bgClip="text"
            marginBottom={2}
            // color="white"
          >
            {pokemon.name}
          </Heading>
          <Text fontWeight="bold" fontSize="md" opacity={0.3} color="black">
            #{pokemon.id}
          </Text>
        </Skeleton>

        <Skeleton marginLeft="auto" isLoaded={!isLoading} fadeDuration={1}>
          <Box width={100} height={100} filter="drop-shadow(0 0 12px #A4A4A4)">
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
