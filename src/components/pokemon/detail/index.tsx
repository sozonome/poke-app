import { useLazyQuery, useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Box, Grid, Heading, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import AccordionWrapper from "components/ui/accordion";
import { DUMMY_POKEMON } from "constants/dummyPokemon";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineCaretLeft } from "react-icons/ai";
import DetailWrapper from "./DetailWrapper";

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

  if (error) return <div>Error</div>;

  return (
    <Grid gap={16}>
      <Button onClick={() => router.back()} leftIcon={<AiOutlineCaretLeft />}>
        back
      </Button>

      <DetailWrapper
        pokemon={data?.pokemon ?? DUMMY_POKEMON}
        isLoading={loading}
      />
    </Grid>
  );
};

export default PokemonDetail;
