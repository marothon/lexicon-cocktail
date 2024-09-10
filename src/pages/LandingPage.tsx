import { ReactElement, useEffect, useState } from "react";
import * as CocktailDB from "../data/TheCocktailDB.ts";

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
        <section id="randomCocktailContainer">
             {/* Tar som exempel 
                https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
             */}
            <figure id="randomCocktailContainer-leftSide">
                <img src={drink?.drinkThumb} />
            </figure>

            <section id="randomCocktailContainer-rightSide">
                <h1>{drink?.drink}</h1>

                <a>More</a>

            </section>
        </section>
        

        <button >Surprise me</button>
    </>
    )
}

export default LandingPage;