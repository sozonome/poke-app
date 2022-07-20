import { Box, Flex, Heading, Icon, Skeleton, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";

import AccessibleLink from "components/AccessibleLink";

import { CaughtPokemonContext } from "components/provider/CaughtPokemonProvider";

import { cardStyle } from "styles/card";

const OwnedInfo = () => {
  const { totalOwned, isLoadingPokemons } = useContext(CaughtPokemonContext);

  return (
    <AccessibleLink href="/pokedex/owned">
      <Skeleton isLoaded={!isLoadingPokemons}>
        <Flex
          width="100%"
          alignItems="center"
          bgGradient="linear(to-br, yellow.400, orange.300)"
          {...cardStyle}
        >
          <Box>
            <Heading size="md">My Pokemon</Heading>
            <Text fontSize="sm" alignItems="center">
              owned:{" "}
              <Text as="span" fontWeight="bold" fontSize="md">
                {totalOwned}
              </Text>
            </Text>
          </Box>

          <Icon
            fontSize="2xl"
            marginLeft="auto"
            children={<AiOutlineCaretRight />}
          />
        </Flex>
      </Skeleton>
    </AccessibleLink>
  );
};

export default OwnedInfo;
