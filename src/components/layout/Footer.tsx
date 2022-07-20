import { Flex, Link, Text } from "@chakra-ui/react";

import AccessibleLink from "components/AccessibleLink";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        {new Date().getFullYear()} -{" "}
        <Link href="https://sznm.dev" isExternal>
          sznm.dev
        </Link>{" "}
        | <AccessibleLink href="/credits">credits</AccessibleLink>
      </Text>
    </Flex>
  );
};

export default Footer;
