import { ReactElement, useEffect, useState } from "react";
import * as CocktailDB from "../data/TheCocktailDB.ts";
import { Link } from "react-router-dom";

export function LandingPage() : ReactElement {
    let [drink, setDrink] = useState<CocktailDB.Drink>();
    useEffect(()  => {
        async function getRandom() {
            let aRandomDrink : CocktailDB.Drink = await CocktailDB.random();
            setDrink(aRandomDrink);
        }

        getRandom();

    }, [])


    return (
    <>
        <section id="randomCocktailCard">
             {/* Tar som exempel 
                https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
             */}
            <figure id="randomCocktailCard-leftSide">
                <img src={drink?.drinkThumb} />
            </figure>
                
            <section id="randomCocktailCard-rightSide">
                <h1>{drink?.drink}</h1>

                <Link to={""} className="moreButtonContainer roboto-condensed-400">
                    <span className="material-symbols-outlined">info</span>
                    More
                </Link>

            </section>
        </section>
        

        <Link to={"/"} className="surpriseMeButton roboto-condensed-400">Surprise me</Link>
    </>
    )
}

export default LandingPage;