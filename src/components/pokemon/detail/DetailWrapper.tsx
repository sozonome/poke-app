import { Button } from "@chakra-ui/button";
import { Box, Grid, Heading, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import Image from "next/image";

import AccordionWrapper from "components/ui/accordion";

import { PokemonDetail } from "./query";

type DetailWrapperProps = {
  pokemon: PokemonDetail;
  isLoading?: boolean;
};

const DetailWrapper = ({ pokemon, isLoading }: DetailWrapperProps) => {
  return (
    <Grid gap={8}>
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
          <Heading>{pokemon.name}</Heading>
        </Skeleton>
      </Box>

      <Skeleton isLoaded={!isLoading}>
        <Button isFullWidth size="lg" colorScheme="orange">
          Capture
        </Button>
      </Skeleton>

      <Grid gap={3}>
        <Skeleton isLoaded={!isLoading}>
          <Heading size="md">types</Heading>
          <Grid templateColumns={["repeat(2, 1fr)"]} gap={1}>
            {pokemon.types.map(({ type: { name } }) => (
              <Text key={name}>{name}</Text>
            ))}
          </Grid>
        </Skeleton>
      </Grid>

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
