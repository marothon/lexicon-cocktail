import { createContext, ReactNode, useContext, useState } from "react";

interface DrinkFavorite {
  id: string;
  drink: string;
  drinkThumb: string;
}

interface GlobalState {
  favorites: DrinkFavorite[];
  toggleFavorite: (id: string) => void; 
}

const defaultGlobalContext: GlobalState = {
  favorites: [],
  toggleFavorite: () => {}
}
const GlobalStateContext = createContext(defaultGlobalContext);

export function GlobalStateProvider ( {children}: {children: ReactNode}) {
  const [favorites, setFavorites] = useState<Map<string, DrinkFavorite>>(new Map<string, DrinkFavorite>());
  
  function toggleFavorite(id: string){
    return
  }

  let data = {
    favorites: Array.from(favorites.values()),
    toggleFavorite: toggleFavorite
  };

  return (
    <GlobalStateContext.Provider value={data}>
      {children}
    </GlobalStateContext.Provider>
  )

}