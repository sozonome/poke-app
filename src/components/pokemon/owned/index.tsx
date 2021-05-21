import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useState } from "react";
import { AiOutlineCaretLeft } from "react-icons/ai";

import AlertDialogWrapper from "components/ui/AlertDialogWrapper";
import AccessibleLink from "components/AccessibleLink";

import {
  CaughtPokemonContext,
  CaughtPokemons,
} from "components/provider/CaughtPokemonProvider";

type SelectedPokemonType = {
  name: string;
  nickName: string;
};

const INITIAL_SELECTED_POKEMON: SelectedPokemonType = {
  name: "",
  nickName: "",
};

const OwnedPokemonList = () => {
  const router = useRouter();
  const { pokemons, totalOwned, updateCaughtPokemons } =
    useContext(CaughtPokemonContext);
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemonType>(
    INITIAL_SELECTED_POKEMON
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const releasePokemon = () => {
    const updateNickNames: Array<string> = pokemons[
      selectedPokemon.name
    ].nickNames.filter(
      (pokemonNickName) => pokemonNickName !== selectedPokemon.nickName
    );
    const updateStoredPokemons: CaughtPokemons = {
      ...pokemons,
      [selectedPokemon.name]: {
        ...pokemons[selectedPokemon.name],
        nickNames: updateNickNames,
      },
    };
    updateCaughtPokemons(updateStoredPokemons);
    onClose();
    toast.closeAll();
    toast({
      title: `${selectedPokemon.nickName} released!`,
      status: "success",
      isClosable: true,
    });
    setSelectedPokemon(INITIAL_SELECTED_POKEMON);
  };

  const handleRelease = (pickedPokemon: SelectedPokemonType) => () => {
    setSelectedPokemon(pickedPokemon);
    onOpen();
  };

  const cancelRelease = () => {
    onClose();
    setSelectedPokemon(INITIAL_SELECTED_POKEMON);
  };

  return (
    <Grid gap={8}>
      <Flex>
        <Button onClick={() => router.back()} leftIcon={<AiOutlineCaretLeft />}>
          back
        </Button>
      </Flex>

      <Heading textAlign="center">My Pokemon</Heading>

      {totalOwned > 0 ? (
        <Grid
          templateColumns={["repeat(2,1fr)", "repeat(3,1fr)", "repeat(4,1fr)"]}
          gap={8}
        >
          {Object.keys(pokemons).map((pokemonName) =>
            pokemons[pokemonName]?.nickNames?.map((nickName) => (
              <Grid
                textAlign="center"
                gap={2}
                padding={2}
                boxShadow="0px 0px 15px 3px rgba(140,140,140,0.2)"
                borderRadius={24}
                key={`${nickName}-${pokemonName}`}
              >
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
            ))
          )}

          <AlertDialogWrapper
            isOpen={isOpen}
            onClose={cancelRelease}
            header="Release Pokemon"
            body={`Are you sure you want to release ${selectedPokemon.nickName} (${selectedPokemon.name})?`}
            confirmButton={
              <Button colorScheme="purple" onClick={releasePokemon}>
                release
              </Button>
            }
          />
        </Grid>
      ) : (
        <Box textAlign="center">
          <Text marginBottom={4}>You haven't catched any pokemon yet.</Text>
          <Button colorScheme="orange" onClick={() => router.push("/")}>
            catch pokemon
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default OwnedPokemonList;
