import { Button } from "@chakra-ui/button";
import { Box, Grid, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext } from "react";

import { CaughtPokemonContext } from "components/provider/CaughtPokemonProvider";

const OwnedPokemonList = () => {
  const router = useRouter();
  const { pokemons } = useContext(CaughtPokemonContext);

  return (
    <Grid gap={4}>
      <Button onClick={() => router.back()}>Back</Button>

      <Grid
        templateColumns={["repeat(2,1fr)", "repeat(3,1fr)", "repeat(4,1fr)"]}
      >
        {Object.keys(pokemons).map((pokemonName) =>
          pokemons[pokemonName]?.nickNames?.map((nickName) => (
            <Grid textAlign="center" gap={2}>
              <Box>
                <Image
                  src={pokemons[pokemonName].image}
                  layout="responsive"
                  width={200}
                  height={200}
                />
              </Box>
              <Box>
                <Heading size="md">{nickName}</Heading>
                <Text fontSize="xs">{pokemonName}</Text>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default OwnedPokemonList;
