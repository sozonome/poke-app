import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

import AccessibleLink from "components/AccessibleLink";

const Header = () => {
  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      width="full"
      zIndex={5}
      color="white"
    >
      <Flex
        align="center"
        maxWidth="800px"
        marginX="auto"
        gridGap={2}
        padding={8}
        backgroundColor="rgba(237, 137, 54, 0.8)"
        backdropFilter="blur(6px)"
        borderBottomRadius={24}
      >
        <AccessibleLink href="/" display="flex" alignItems="center" gridGap={2}>
          <Box width={8}>
            <Image
              src="/pokeball.svg"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </Box>
          <Box>
            <Heading as="h1" size="md">
              Pokemon
            </Heading>
            <Text fontSize="sm">Catch 'em all!</Text>
          </Box>
        </AccessibleLink>
      </Flex>
    </Box>
  );
};

export default Header;
