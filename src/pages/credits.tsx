import { Box, Flex, Grid, Heading, Image, Link } from "@chakra-ui/react";

const Credits = () => {
  return (
    <Grid gap={8}>
      <Heading>credits</Heading>

      <Grid gap={4}>
        <Flex alignItems="center" gridGap={4}>
          <Box width={20}>
            <Image
              src="/pikachu.svg"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </Box>
          <Box>
            Icons made by{" "}
            <Link
              href="https://www.flaticon.com/authors/those-icons"
              title="Those Icons"
              isExternal
            >
              Those Icons
            </Link>{" "}
            from{" "}
            <Link href="https://www.flaticon.com/" title="Flaticon" isExternal>
              www.flaticon.com
            </Link>
          </Box>
        </Flex>

        <Flex alignItems="center" gridGap={4}>
          <Box width={20}>
            <Image
              src="/pokeball.svg"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </Box>

          <Box>
            Icons made by{" "}
            <Link
              href="https://www.flaticon.com/authors/darius-dan"
              title="Darius Dan"
              isExternal
            >
              Darius Dan
            </Link>{" "}
            from{" "}
            <Link href="https://www.flaticon.com/" title="Flaticon" isExternal>
              www.flaticon.com
            </Link>
          </Box>
        </Flex>
      </Grid>
    </Grid>
  );
};

export default Credits;
