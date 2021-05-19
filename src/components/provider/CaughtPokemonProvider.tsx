import { createContext, ReactNode, useEffect, useState } from "react";

type CaughtPokemon = {
  name: string;
  nickName: string;
};

type CaughtPokemonContextType = {
  pokemons: Array<CaughtPokemon>;
  updateCaughtPokemons: (pokemons: Array<CaughtPokemon>) => void;
};

export const CaughtPokemonContext = createContext<CaughtPokemonContextType>({
  pokemons: [],
  updateCaughtPokemons: () => {},
});

type CaughtPokemonProviderProps = {
  children: ReactNode;
};

const CaughtPokemonProvider = ({ children }: CaughtPokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<Array<CaughtPokemon>>([]);

  useEffect(() => {
    if (localStorage.caughtPokemons) {
      const persistedCaughtPokemons: Array<CaughtPokemon> = JSON.parse(
        localStorage.caughtPokemons
      );
      setPokemons(persistedCaughtPokemons);
    }
  }, []);

  const updateCaughtPokemons = (updatePokemons: Array<CaughtPokemon>) => {
    localStorage.caughtPokemons = JSON.stringify(updatePokemons);
    setPokemons(updatePokemons);
  };

  return (
    <CaughtPokemonContext.Provider value={{ pokemons, updateCaughtPokemons }}>
      {children}
    </CaughtPokemonContext.Provider>
  );
};

export default CaughtPokemonProvider;
