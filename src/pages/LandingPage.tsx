import { ReactElement, useState } from "react";
import * as CocktailDB from "../data/TheCocktailDB.ts";
import { Link, useLoaderData } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton.tsx";
import { Drink } from "../data/Drink.ts";

export async function loaderLandingPage(){
  let aRandomDrink: Drink = await CocktailDB.random();
  return aRandomDrink;
}

export default function LandingPage(): ReactElement {
  const randomDrink: Drink = useLoaderData() as Drink;
  const [drink, setDrink] = useState<Drink>(randomDrink);

  async function getRandom() {
    let aRandomDrink: Drink = await CocktailDB.random();
    setDrink(aRandomDrink);
  }

  return (
    <>
      <section id="randomCocktailCard">
        <figure id="randomCocktailCard-leftSide">
          <img src={drink?.drinkThumb} />
        </figure>

        <section id="randomCocktailCard-rightSide">
          <p>{drink?.drink}</p>

          <aside className='favoriteButtonContainer'>
            <FavoriteButton key={drink.id} drink={drink as Drink}/>
          </aside>
          
          <Link to={`cocktail/${drink?.id}`} className="moreButtonContainer">
            <span className="material-symbols-outlined">info</span>
            More            
          </Link>
        </section>
      </section>

      <Link to={"/"} onClick={getRandom} className="surpriseMeButton">Surprise me</Link>
    </>
  )
}
