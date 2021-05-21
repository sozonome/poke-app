import { createContext, ReactNode, useEffect, useState } from "react";

export type CaughtPokemons = {
  [name: string]: {
    image: string;
    nickNames: Array<string>;
  };
};

type CaughtPokemonContextType = {
  pokemons: CaughtPokemons;
  totalOwned: number;
  updateCaughtPokemons: (pokemons: CaughtPokemons) => void;
};

export const CaughtPokemonContext = createContext<CaughtPokemonContextType>({
  pokemons: {},
  totalOwned: 0,
  updateCaughtPokemons: () => {},
});

type CaughtPokemonProviderProps = {
  children: ReactNode;
};

const CaughtPokemonProvider = ({ children }: CaughtPokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<CaughtPokemons>({});
  const [totalOwned, setTotalOwned] = useState<number>(0);

  const countTotalPokemon = (caughtPokemons: CaughtPokemons) => {
    let total = 0;
    Object.keys(caughtPokemons).forEach(
      (pokemon) => (total += caughtPokemons[pokemon]?.nickNames?.length ?? 0)
    );
    return total;
  };

  useEffect(() => {
    if (localStorage.caughtPokemons) {
      const persistedCaughtPokemons: CaughtPokemons = JSON.parse(
        localStorage.caughtPokemons
      );
      const counted = countTotalPokemon(persistedCaughtPokemons);

      setPokemons(persistedCaughtPokemons);
      setTotalOwned(counted);
    }
  }, []);

  const updateCaughtPokemons = (updateCaughtPokemons: CaughtPokemons) => {
    const updateTotalOwned = countTotalPokemon(updateCaughtPokemons);

    setTotalOwned(updateTotalOwned);
    localStorage.caughtPokemons = JSON.stringify(updateCaughtPokemons);
    setPokemons(updateCaughtPokemons);
  };

  return (
    <CaughtPokemonContext.Provider
      value={{ pokemons, totalOwned, updateCaughtPokemons }}
    >
      {children}
    </CaughtPokemonContext.Provider>
  );
};

export default CaughtPokemonProvider;
