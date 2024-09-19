import { LoaderFunction, useLoaderData, useSearchParams } from "react-router-dom";
import * as CocktailDB from '../data/TheCocktailDB';
import { Ingredient } from "../data/Ingredient";
import { Drink } from "../data/Drink";
import CocktailCard from "../components/CocktailCard";
import { useEffect, useState } from "react";
import Paginator from "../components/Paginator";

export const ingredientPageLoader: LoaderFunction = async ({params}) => {
  let ingredient = await CocktailDB.searchIngredient(params.name as string);
  let drinks = await CocktailDB.filterByIngredient(params.name as string);
  return {
    ingredient: ingredient, 
    drinks: drinks
  };
}

export default function IngredientPage() {
  const {ingredient, drinks} = useLoaderData() as {ingredient: Ingredient, drinks: Drink[]};
  const [displayedCocktails, setDisplayedCocktails] = useState<Drink[]>(drinks.slice(0, 5));
  const [searchParams, _ ] = useSearchParams();
  const BASE_IMAGE_URL: string = 'http://www.thecocktaildb.com/images/ingredients';
  
  const handlePagination = (page: number) => {
    const startIndex = (page-1)*6;
    const endIndex = (page)*6-1;
    setDisplayedCocktails(drinks.slice(Math.floor(startIndex), endIndex));
  };

  useEffect(() => {
    handlePagination(parseInt(searchParams.get('p') as string) || 1);
  }, []);

  return (
    <section className="ingredient-page">
      <section className="ingredient-thumbnail-container">
        <img className="ingredient-thumbnail" src={`${BASE_IMAGE_URL}/${ingredient.ingredient}.png`} />
      </section>
      <section className="ingredient-info-container">
        <h1>{ingredient.ingredient}</h1>
        <h3>
        {
          ingredient.alcohol == 'Yes' ?
            `Alcoholic ${ingredient.ABV ? '('+ingredient.ABV+'%)' : ''}` :
            'Non-alcoholic'
        } {ingredient.type}
        </h3>
        <p className="ingredient-description">{ingredient.description}</p>
        <p></p>
      </section>
      <section className="used-in-cocktails-container">
          <h3>Cocktails using {ingredient.ingredient}</h3>
          <Paginator pageCount={Math.ceil(drinks.length/6)} handlePagination={handlePagination} />
          <div className="cocktail-list">
            {displayedCocktails.map((d) => <CocktailCard key={d.id} drink={d}/>)}
          </div>
        </section>
    </section>
  )
}
