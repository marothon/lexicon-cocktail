import { ReactElement } from "react";

export function LandingPage() : ReactElement {
    return (
    <>
        <section id="randomCocktailContainer">
             {/* Tar som exempel 
                https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
             */}
            <figure id="randomCocktailContainer-leftSide">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/Klassiche_Margarita.jpg" />
            </figure>

            <section id="randomCocktailContainer-rightSide">
                
                <section id="randomCocktailContainer-rightSide-top">
                    Cocktail name
                </section>

                <section id="randomCocktailContainer-rightSide-bottom">
                    More
                </section>

            </section>
        </section>
        

        <button >Surprise me</button>
    </>
    )
}

export default LandingPage;