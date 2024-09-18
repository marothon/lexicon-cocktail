import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext.tsx";
import CocktailCardList from "../components/CocktailCardList.tsx";
import * as CocktailDB from "../data/TheCocktailDB.ts";
import Paginator from "../components/Paginator.tsx";
import { useSearchParams } from "react-router-dom";

export default function FavoritesPage() : ReactElement {
  let { favorites } = useContext(GlobalStateContext);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pagedFavorites, setPagedFavorites] = useState<CocktailDB.Drink[]>();
  
  const handlePagination = (page: number) => {
    setPageCount(Math.ceil(favorites.length/10));
    let favoriteDrinks = favorites.map(d => d as CocktailDB.Drink)
    setPagedFavorites(favoriteDrinks.slice( (page-1)*10, page*10));

  };

  useEffect( () => {

    handlePagination(1);
  }, [])


  return (
    <>
    
      <Paginator
            pageCount={pageCount}
            handlePagination={handlePagination}
      />
      {
        pagedFavorites ? 
        <CocktailCardList cocktails={pagedFavorites} />
        :
        null
      }
      
    </>
    
  )

}