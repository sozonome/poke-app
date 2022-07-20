import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import CatchWrapper from "./CatchWrapper";
import AccordionWrapper from "components/ui/accordion";

import { PokemonDetail } from "../query";

import { textGradientStyle } from "styles/textGradient";

type DetailWrapperProps = {
  pokemon: PokemonDetail;
  isLoading?: boolean;
};

const DetailWrapper = ({ pokemon, isLoading }: DetailWrapperProps) => {
  return (
    <Grid gap={8}>
      <Grid gap={8} templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}>
        <Box>
          <Skeleton isLoaded={!isLoading}>
            <Image
              layout="responsive"
              src={pokemon.sprites.front_default}
              width="100%"
              height="100%"
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Flex gridGap={2} alignItems="center">
              <Heading {...textGradientStyle}>{pokemon.name}</Heading>
              <Text fontWeight="bold" fontSize="md" opacity={0.3}>
                #{pokemon.id}
              </Text>
            </Flex>
          </Skeleton>
        </Box>

        <Skeleton
          isLoaded={!isLoading}
          display="grid"
          gridGap={8}
          alignItems="center"
        >
          <CatchWrapper pokemon={pokemon} />

          <Flex alignItems="center" gridGap={2} wrap="wrap">
            <Heading width="full" size="sm">
              abilities
            </Heading>
            <Grid templateColumns={["repeat(2, 1fr)"]} gap={1}>
              {pokemon.abilities.map(({ ability: { name } }) => (
                <Text key={name}>{name}</Text>
              ))}
            </Grid>
          </Flex>
        </Skeleton>
      </Grid>

      <Skeleton isLoaded={!isLoading}>
        <Flex alignItems="center" gridGap={2}>
          <Heading size="sm">types</Heading>
          <Wrap>
            {pokemon.types.map(({ type: { name } }) => (
              <WrapItem key={name}>
                <Badge colorScheme="purple">{name}</Badge>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      </Skeleton>

      <AccordionWrapper
        allowToggle
        isLoading={isLoading}
        items={[
          {
            button: (
              <Heading flex={1} textAlign="left" size="md">
                moves
              </Heading>
            ),
            buttonProps: {
              paddingX: 0,
            },
            content: (
              <Grid templateColumns={["repeat(2, 1fr)"]} gap={1}>
                {pokemon.moves.map(({ move: { name } }) => (
                  <Text key={name}>{name}</Text>
                ))}
              </Grid>
            ),
          },
        ]}
      />
    </Grid>
  );
};

export default DetailWrapper;
