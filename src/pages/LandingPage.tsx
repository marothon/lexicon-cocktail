import { ReactElement } from "react";


const margarita = 
{
    "id": "11007",
    "drink": "Margarita",
    "drinkAlternate": null,
    "tags": ["IBA", "ContemporaryClassic"],
    "video": null,
    "category": "Ordinary Drink",
    "IBA": "Contemporary Classics",
    "alcoholic": "Alcoholic",
    "glass": "Cocktail glass",
    "instructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
    "drinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/5noda61589575158.jpg",
    "ingredients": [
        {
            "ingredient": "Tequila",
            "measure": "1 1\/2 oz "
        },
        {
            "ingredient": "Triple sec",
            "measure": "1\/2 oz "
        },
        {
            "ingredient": "Lime juice",
            "measure": "1 oz "
        },
        {
            "ingredient": "Salt",
            "measure": null
        }
    ],
    "imageSource": "https:\/\/commons.wikimedia.org\/wiki\/File:Klassiche_Margarita.jpg",
    "imageAttribution": "Cocktailmarler",
    "creativeCommonsConfirmed": "Yes",
    "dateModified": "2015-08-18 14:42:59"
}

export function LandingPage() : ReactElement {
    return (
    <>
        <section id="randomCocktailCard">
             {/* Tar som exempel 
                https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
             */}
            <figure id="randomCocktailCard-leftSide">
                <img src="https://www.thecocktaildb.com//images//media//drink//5noda61589575158.jpg" />
            </figure>

            <section id="randomCocktailCard-rightSide">
                
                <p>Cocktail name</p>
                <p>More</p>
            </section>
        </section>
        

        <button >Surprise me</button>
    </>
    )
}

export default LandingPage;