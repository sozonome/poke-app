import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "components/layout";
import CaughtPokemonProvider from "components/provider/CaughtPokemonProvider";
import { FC, ReactElement } from "react";

import customTheme from "styles/customTheme";

const ChakraRenderer: FC = ({ children }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <CaughtPokemonProvider>
        <Layout>{children}</Layout>
      </CaughtPokemonProvider>
    </ChakraProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: ChakraRenderer, ...options });

export * from "@testing-library/react";
export { customRender as render };
