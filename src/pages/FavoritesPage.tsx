import { ReactElement, useContext } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext.tsx";
import CocktailCardList from "../components/CocktailCardList.tsx";
import * as CocktailDB from "../data/TheCocktailDB.ts";

export default function FavoritesPage() : ReactElement {
  let { favorites, toggleFavorite } = useContext(GlobalStateContext);
  
  
  let adaptedFavorites : CocktailDB.Drink[] = [];
  
  /*
  favorites.forEach(element => {
    console.log(element);
    adaptedFavorites(i) = { element, ... }
  });
  */
  
  return (
    <CocktailCardList cocktails={favorites.map(d => d as CocktailDB.Drink)} />
  )

}