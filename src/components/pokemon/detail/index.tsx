import { useLazyQuery } from "@apollo/client";
import { Button, Flex, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineCaretLeft } from "react-icons/ai";

import DetailWrapper from "./components/DetailWrapper";

import { DUMMY_POKEMON } from "constants/dummyPokemon";
import { PokemonDetailRes, POKEMON_DETAIL } from "./query";

const PokemonDetail = () => {
  const router = useRouter();
  const {
    query: { name },
  } = router;

  const [getPokemonDetail, { data, loading, error }] =
    useLazyQuery<PokemonDetailRes>(POKEMON_DETAIL);

  useEffect(() => {
    if (name) {
      getPokemonDetail({ variables: { name: name as string } });
    }
  }, [name]);

  const handleBack = () =>
    history.length > 2 ? router.back() : router.push("/");

  if (error) return <div>Error</div>;

  if (data && !data.pokemon.name) return <div>Pokemon not Found</div>;

  return (
    <Grid gap={16}>
      <Flex>
        <Button onClick={handleBack} leftIcon={<AiOutlineCaretLeft />}>
          back
        </Button>
      </Flex>

      <DetailWrapper
        pokemon={data?.pokemon ?? DUMMY_POKEMON}
        isLoading={loading}
      />
    </Grid>
  );
};

export default PokemonDetail;
