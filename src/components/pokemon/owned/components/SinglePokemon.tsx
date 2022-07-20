import { Box, Button, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";

import AccessibleLink from "components/AccessibleLink";

import { CaughtPokemonContext } from "components/provider/CaughtPokemonProvider";

import { SelectedPokemonType } from "./ListWrapper";

import { cardStyle } from "styles/card";

type SinglePokemonProps = {
  pokemonName: string;
  nickName: string;
  handleRelease: (pickedPokemon: SelectedPokemonType) => () => void;
};

const SinglePokemon = ({
  pokemonName,
  nickName,
  handleRelease,
}: SinglePokemonProps) => {
  const { pokemons } = useContext(CaughtPokemonContext);

  return (
    <Grid textAlign="center" gap={2} {...cardStyle}>
      <AccessibleLink href={`/pokedex/${pokemonName}`}>
        <Box>
          <Image
            src={pokemons[pokemonName].image}
            layout="responsive"
            width={200}
            height={200}
          />
        </Box>
        <Box wordBreak="break-word">
          <Heading size="md">{nickName}</Heading>
          <Text fontSize="xs">{pokemonName}</Text>
        </Box>
      </AccessibleLink>

      <Button
        colorScheme="purple"
        onClick={handleRelease({ name: pokemonName, nickName })}
      >
        release
      </Button>
    </Grid>
  );
};

export default SinglePokemon;
