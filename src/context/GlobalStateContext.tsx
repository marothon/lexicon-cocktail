import { createContext, ReactNode, useState } from "react";
import * as CocktailDB from "../data/TheCocktailDB";

interface DrinkFavorite {
  id: string;
  drink: string;
  drinkThumb: string;
}

interface GlobalState {
  favorites: DrinkFavorite[];
  toggleFavorite: (id: CocktailDB.Drink) => void; 
}

const defaultGlobalContext: GlobalState = {
  favorites: [],
  toggleFavorite: () => {}
}

export const GlobalStateContext = createContext<GlobalState>(defaultGlobalContext);

export function GlobalStateProvider ( {children}: {children: ReactNode}) {
  const [favorites, setFavorites] = useState<Map<string, DrinkFavorite>>(new Map<string, DrinkFavorite>());
  
  function toggleFavorite(drink: CocktailDB.Drink){
    if(favorites.has(drink.id)){
      setFavorites((oldFavorites) => {
        oldFavorites.delete(drink.id);
        return structuredClone(oldFavorites);
      })
      
    }
    else{
      setFavorites((oldFavorites) => {
        oldFavorites.set(drink.id, {id: drink.id, drink: drink.drink, drinkThumb: drink.drinkThumb});
        return structuredClone(oldFavorites);
      })
    }
  }

  let data: GlobalState = {
    favorites: Array.from(favorites.values()),
    toggleFavorite: toggleFavorite
  };

  return (
    <GlobalStateContext.Provider value={data}>
      {children}
    </GlobalStateContext.Provider>
  )

}