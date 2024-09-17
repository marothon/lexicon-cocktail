import { ReactElement, useEffect, useState } from "react";
import * as CocktailDB from "../data/TheCocktailDB.ts";
import { Link, useLoaderData } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton.tsx";

export async function loaderLandingPage(){
  let aRandomDrink: CocktailDB.Drink = await CocktailDB.random();
  return aRandomDrink;
}

export default function LandingPage(): ReactElement {
  const randomDrink: CocktailDB.Drink = useLoaderData() as CocktailDB.Drink;
  const [drink, setDrink] = useState<CocktailDB.Drink>(randomDrink);
  useEffect(() => {
    getRandom();
  }, [])

  async function getRandom() {
    let aRandomDrink: CocktailDB.Drink = await CocktailDB.random();
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
            <FavoriteButton key={drink.id} drink={drink as CocktailDB.Drink}/>
          </aside>
          
          <Link to={""} className="moreButtonContainer">
            <span className="material-symbols-outlined">info</span>
            More
          </Link>

        </section>
      </section>


      <Link to={"/"} onClick={getRandom} className="surpriseMeButton">Surprise me</Link>
    </>
  )
}