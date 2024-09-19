import { ReactNode, useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext.tsx";
import CocktailCardList from "../components/CocktailCardList.tsx";
import { Drink } from "../data/Drink.ts";
import Paginator from "../components/Paginator.tsx";
import { useLocation, useSearchParams } from "react-router-dom";

export default function FavoritesPage(): ReactNode {
  let { favorites } = useContext(GlobalStateContext);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pagedFavorites, setPagedFavorites] = useState<Drink[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePagination = (page: number) => {
    setPageCount(Math.ceil(favorites.length / 10));
    let favoriteDrinks = favorites.map(d => d as Drink)
    setPagedFavorites(favoriteDrinks.slice((page - 1) * 10, page * 10));

  };

  useEffect(() => {
    handlePagination(1);
  }, [])

  useEffect(() => {
    
    let queryParameters = new URLSearchParams(window.location.search);
    let pageNumber = Number(queryParameters.get('p'));
    if (favorites.length % 10 == 0 && favorites.length >= 10) {
      if(pageNumber > 1){
        setPageCount(pageNumber--);
        setSearchParams({ p : pageNumber.toString() });
      }
    }
    
    handlePagination(pageNumber);
    
  }, [favorites])

  let location = useLocation();
  useEffect(() => {
    const p = new URLSearchParams(location.search).get('p');
    handlePagination(Number(p));
    
  }, [location]);
  
  return (
    <div className="favorite-page">
      {pagedFavorites.length > 0 ?
        <>
          {pageCount > 1 ?
            <Paginator
              pageCount={pageCount}
              handlePagination={handlePagination}
            />
            : null
          }
          <CocktailCardList cocktails={pagedFavorites} />
        </>
        :
        <h1>You have no favorite cocktails.</h1>
      }
    </div>
  );

}