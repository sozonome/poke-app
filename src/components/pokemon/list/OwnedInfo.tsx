import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useContext } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";

import AccessibleLink from "components/AccessibleLink";

import { CaughtPokemonContext } from "components/provider/CaughtPokemonProvider";

const OwnedInfo = () => {
  const { totalOwned } = useContext(CaughtPokemonContext);

  return (
    <AccessibleLink href="/pokedex/owned">
      <Flex
        width="100%"
        boxShadow="0px 0px 15px 3px rgba(140,140,140,0.2)"
        padding={4}
        borderRadius={24}
        alignItems="center"
        bgGradient="linear(to-br, yellow.400, orange.300)"
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
    </AccessibleLink>
  );
};

export default OwnedInfo;
