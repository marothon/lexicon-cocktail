import { ReactNode, useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext.tsx";
import CocktailCardList from "../components/CocktailCardList.tsx";
import { Drink } from "../data/Drink.ts";
import Paginator from "../components/Paginator.tsx";
import { useLocation, useSearchParams } from "react-router-dom";
import { FavoritePieChart } from "../components/FavoritePieChart.tsx";
import { useMediaQuery } from "react-responsive";
import FavoriteStatisticsCard from "../components/FavoriteStatisticsCard";
import { DrinkStatistics } from "../data/Drinkstatistics.ts";

export default function FavoritesPage(): ReactNode {
  let { favorites } = useContext(GlobalStateContext);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pagedFavorites, setPagedFavorites] = useState<Drink[]>([]);
  let initialDataArray = [
    { type: "Alcoholic", numberOfDrinks: 0, fill: "#944d2f"},
    { type: "Non alcoholic", numberOfDrinks: 0, fill: "#2a8c49"},
    { type: "Optional alcohol", numberOfDrinks: 0, fill: "#d4e632"}
  ];
  const [data, setData] = useState<DrinkStatistics[]>(initialDataArray);
  const [_, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
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
      if (pageNumber > 1) {
        setPageCount(pageNumber--);
        setSearchParams({ p: pageNumber.toString() });
      }
    }

    handlePagination(pageNumber);



    const updatedData = data.map((dataObject) => {
      let numberOfDrinks = 0;

      favorites.forEach((favorite: any) => {
        if (dataObject.type == favorite.alcoholic) {
          numberOfDrinks++;
        }
      });

      let newObj = { ...dataObject, numberOfDrinks: numberOfDrinks };
      return newObj;
    })

    setData(updatedData);
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
          {isMobile ? 
            <FavoriteStatisticsCard data={data}/>
            :
            <FavoritePieChart data={data} />
          }
        </>
        :
        <h1>You have no favorite cocktails.</h1>
      }
    </div>
  );

}
