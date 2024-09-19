import { useState } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom"
import * as CocktailDB from "../data/TheCocktailDB";
import FavoriteButton from "../components/FavoriteButton";
import { Drink, DrinkIngredient } from "../data/Drink";
import IngredientCard from "../components/IngredientCard";

export const cocktailPageLoader: LoaderFunction = async ({params}) => {
  return await CocktailDB.lookupDrink(params.id as string);
}

export default function CocktailPage() {
  const [drink, _] = useState(useLoaderData() as Drink);

  return (
    <section className="cocktail-page">
      <img src={drink.drinkThumb}/>
      <div className="details-container">
        <section className="details">
          <div className="header">
            <h1>{drink.drink}</h1>
            <div className="tags">
              {[
                <div key={drink.alcoholic} className="tag alcoholic">{drink.alcoholic}</div>,
                <div key={drink.category} className="tag category">{drink.category}</div>,
                drink.tags?.map((tag:string) => 
                  (
                    <div key={tag} className="tag">{tag}</div>
                  )).flat()
              ]}
            </div>
          </div>
          <p>{drink.instructions}</p>
          {
            drink.glass ?
            <p>Recommended container: {drink.glass}</p>
            :
            ''
          }
          <h3>Ingredients</h3>
          <section className="ingredients">
            {
              drink.ingredients?.map((i: DrinkIngredient) => 
                (
                  <IngredientCard key={i.ingredient+i.measure} ingredient={i} />
                )
              )
            }
          </section>
        </section>
        <aside className="favorite-button-container">
          <FavoriteButton drink={drink} />
        </aside>
      </div>
    </section>
  )
}
