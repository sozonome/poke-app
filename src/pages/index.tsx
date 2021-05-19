import { Box } from "@chakra-ui/layout";
import PokemonList from "components/pokemon/list";

const Home = () => {
  return (
    <Box mb={8} w="full">
      <PokemonList />
    </Box>
  );
};

export default Home;
