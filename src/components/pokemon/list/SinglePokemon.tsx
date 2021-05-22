import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
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
    "linear(to-br, red.100, blue.100)"
  );

  return (
    <AccessibleLink href={!isLoading ? `/pokedex/${pokemon.name}` : "/"}>
      <Box
        background={`linear-gradient(225deg, rgba(255, 255, 255, 1), rgba(120, 120, 120, 0.5)), url(${pokemon.image})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundClip="border-box"
        backgroundPosition="center"
        backgroundBlendMode="luminosity"
        boxShadow="0px 0px 15px 3px rgba(140,140,140,0.2)"
        borderRadius={24}
      >
        <Flex
          borderRadius={24}
          padding={4}
          alignItems="center"
          gap={2}
          backdropFilter="blur(75px) brightness(1.09)"
          key={pokemon.name}
        >
          <Skeleton isLoaded={!isLoading} fadeDuration={1}>
            <Heading
              wordBreak="break-word"
              size="sm"
              bgGradient={textBgColor}
              filter="drop-shadow(0 0 12px #FFFFFF)"
              bgClip="text"
            >
              {pokemon.name}
            </Heading>
            <Text fontWeight="semibold" fontSize="sm">
              #{pokemon.id}
            </Text>
          </Skeleton>

          <Skeleton marginLeft="auto" isLoaded={!isLoading} fadeDuration={1}>
            <Box
              width={[100, 150]}
              height={[100, 150]}
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
      </Box>
    </AccessibleLink>
  );
};

export default SinglePokemon;
