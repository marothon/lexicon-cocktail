import { createContext, ReactNode, useState } from "react";
import { Drink } from "../data/Drink";

interface DrinkFavorite {
  id: string;
  drink: string;
  drinkThumb: string;
}

interface GlobalState {
  favorites: DrinkFavorite[];
  toggleFavorite: (drink: Drink) => boolean;
  isFavorite: (drink: Drink) => boolean;
}

const defaultGlobalContext: GlobalState = {
  favorites: [],
  toggleFavorite: () => false,
  isFavorite: () => false
}

export const GlobalStateContext = createContext<GlobalState>(defaultGlobalContext);

export function GlobalStateProvider ( {children}: {children: ReactNode}) {
  const [favorites, setFavorites] = useState<Map<string, DrinkFavorite>>(new Map<string, DrinkFavorite>());

  function toggleFavorite(drink: Drink){
    if(favorites.has(drink.id)){
      setFavorites((oldFavorites) => {
        oldFavorites.delete(drink.id);
        return structuredClone(oldFavorites);
      });
      return false;
    }
    else{
      setFavorites((oldFavorites) => {
        oldFavorites.set(drink.id, {id: drink.id, drink: drink.drink, drinkThumb: drink.drinkThumb});
        return structuredClone(oldFavorites);
      });
      return true;
    }
  }

  function isFavorite(drink: Drink){
    return favorites.has(drink.id);
  }

  let data: GlobalState = {
    favorites: Array.from(favorites.values()),
    toggleFavorite: toggleFavorite,
    isFavorite: isFavorite
  };

  return (
    <GlobalStateContext.Provider value={data}>
      {children}
    </GlobalStateContext.Provider>
  )

}
