import { Box, Flex, Heading, Text } from "@chakra-ui/layout";

import AccessibleLink from "components/AccessibleLink";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          Pokemon
        </Heading>
        <Text fontSize="sm">Catch 'em all!</Text>
      </AccessibleLink>

      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
