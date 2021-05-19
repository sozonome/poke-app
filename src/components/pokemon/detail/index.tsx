import { useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Box, Grid, Heading, Text } from "@chakra-ui/layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineCaretLeft } from "react-icons/ai";

import { PokemonDetailRes, POKEMON_DETAIL } from "./query";

const PokemonDetail = () => {
  const router = useRouter();
  const {
    query: { name },
  } = router;

  const { data, loading, error } = useQuery<PokemonDetailRes>(POKEMON_DETAIL, {
    variables: {
      name: name as string,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return data ? (
    <Grid gap={16}>
      <Button onClick={() => router.back()} leftIcon={<AiOutlineCaretLeft />}>
        back
      </Button>

      <Grid gap={8}>
        <Box>
          <Image
            layout="responsive"
            src={data.pokemon.sprites.front_default}
            width="100%"
            height="100%"
          />
          <Heading>{data.pokemon.name}</Heading>
        </Box>

        <Grid gap={3}>
          <Heading size="md">types</Heading>
          <Grid templateColumns={["repeat(2, 1fr)"]} gap={1}>
            {data.pokemon.types.map(({ type: { name } }) => (
              <Text>{name}</Text>
            ))}
          </Grid>
        </Grid>

        <Grid gap={3}>
          <Heading size="md">moves</Heading>
          <Grid templateColumns={["repeat(2, 1fr)"]} gap={1}>
            {data.pokemon.moves.map(({ move: { name } }) => (
              <Text>{name}</Text>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

export default PokemonDetail;
