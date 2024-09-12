import { ReactElement, useEffect, useState } from "react";
import * as CocktailDB from "../data/TheCocktailDB.ts";
import { Link } from "react-router-dom";


export default function LandingPage(): ReactElement {
  let [drink, setDrink] = useState<CocktailDB.Drink>();
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