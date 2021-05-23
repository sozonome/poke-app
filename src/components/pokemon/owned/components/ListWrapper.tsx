import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Grid } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { ChangeEventHandler, useContext, useState } from "react";
import { MdClear, MdSearch } from "react-icons/md";

import AlertDialogWrapper from "components/ui/AlertDialogWrapper";
import InputWrapper from "components/ui/InputWrapper";
import SinglePokemon from "./SinglePokemon";

import {
  CaughtPokemonContext,
  CaughtPokemons,
} from "components/provider/CaughtPokemonProvider";

export type SelectedPokemonType = {
  name: string;
  nickName: string;
};

const INITIAL_SELECTED_POKEMON: SelectedPokemonType = {
  name: "",
  nickName: "",
};

const ListWrapper = () => {
  const { pokemons, updateCaughtPokemons } = useContext(CaughtPokemonContext);

  const [keyword, setKeyword] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemonType>(
    INITIAL_SELECTED_POKEMON
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleRelease = (pickedPokemon: SelectedPokemonType) => () => {
    setSelectedPokemon(pickedPokemon);
    onOpen();
  };

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

  const cancelRelease = () => {
    onClose();
    setSelectedPokemon(INITIAL_SELECTED_POKEMON);
  };

  const handleChangeKeyword: ChangeEventHandler<HTMLInputElement> = (event) =>
    setKeyword(event.target.value);
  const clearKeyword = () => setKeyword("");

  return (
    <>
      <InputWrapper
        placeholder="pokemon name / nickname"
        value={keyword}
        type="text"
        onChange={handleChangeKeyword}
        leftElement={<MdSearch />}
        rightElement={
          keyword.length && (
            <IconButton
              aria-label="clear"
              onClick={clearKeyword}
              variant="ghost"
              margin={2}
              icon={<MdClear />}
            />
          )
        }
      />

      <Grid
        templateColumns={["repeat(2,1fr)", "repeat(3,1fr)", "repeat(4,1fr)"]}
        gap={8}
      >
        {Object.keys(pokemons).map((pokemonName) =>
          pokemons[pokemonName]?.nickNames
            ?.filter(
              (nickName) =>
                pokemonName.includes(keyword) || nickName.includes(keyword)
            )
            .map((nickName) => (
              <SinglePokemon
                pokemonName={pokemonName}
                nickName={nickName}
                handleRelease={handleRelease}
                key={`${nickName}-${pokemonName}`}
              />
            ))
        )}
      </Grid>
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
    </>
  );
};

export default ListWrapper;
