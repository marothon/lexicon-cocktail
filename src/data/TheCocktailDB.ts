import { Drink, DrinkIngredient } from "./Drink";
import { Ingredient } from "./Ingredient";

const THE_COCKTAIL_DB_API_BASE_URL: string = "https://www.thecocktaildb.com/api/json/v1/1/";


export async function random() : Promise<Drink> {
    return requestEndpoint<Drink>(
        "random.php",
        data => data.drinks[0],
        data => transformToDrink(data.drinks[0])
    );
}

export async function search(query: string) : Promise<Array<Drink>> {
    return requestEndpoint<Array<Drink>>(
        "search.php",
        data => Array.isArray(data.drinks),
        data => data.drinks.map(transformToDrink),
        [{key: "s", value: query}]
    );
}

export async function searchIngredient(query: string) : Promise<Ingredient> {
    return requestEndpoint<Ingredient>(
        "search.php",
        data => data.ingredients[0],
        data => transformToIngredient(data.ingredients[0]),
        [{key: "i", value: query}]
    );
}

export async function lookupDrink(id: string) : Promise<Drink> {
    return requestEndpoint<Drink>(
        "lookup.php",
        data => data.drinks[0],
        data => transformToDrink(data.drinks[0]),
        [{key: "i", value: id}]
    );
}

export async function lookupIngredient(id: string) : Promise<Ingredient> {
    return requestEndpoint<Ingredient>(
        "lookup.php",
        data => data.ingredients[0],
        data => transformToIngredient(data.ingredients[0]),
        [{key: "iid", value: id}]
    );
}

export async function filterByIngredient(ingredientName: string) : Promise<Drink[]> {
    return requestEndpoint<Drink[]>(
        'filter.php',
        data => data.drinks,
        data => data.drinks.map((d: any) => transformToDrink(d)),
        [{key: 'i', value: ingredientName}]
    );
}

async function requestEndpoint<T>(endpointUri: string, test: (data: any) => boolean, transform: (data: any) => T,
    parameters: Array<{key: string, value: string}> = []): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        try {
            let paramString: string = "";
            if (parameters.length > 0) {
                paramString = "?" + parameters.map(
                        (parameter) => encodeURI(parameter.key) + "=" + encodeURI(parameter.value)
                    ).join();
            }

            const response = await fetch(THE_COCKTAIL_DB_API_BASE_URL + endpointUri + paramString);
            if (!response.ok) {
                console.log("Network response was not ok");
                reject("Network response was not ok.");
            }
            const data = await response.json();

            if (test(data)) {
                resolve(transform(data));
            } else {
                console.log("No drinks in response", data);
                reject("Sorry, no drinks for you.");
            }
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
            reject("There has been a problem with your fetch operation.");
        }
    });
}

function transformToDrink(data: any) : Drink {
    return {
        id: data.idDrink,
        drink: data.strDrink,
        drinkAlternate: data.strDrinkAlternate,
        tags: data.strTags?.split(","),
        video: data.strVideo,
        category: data.strCategory,
        IBA: data.strIBA,
        alcoholic: data.strAlcoholic,
        glass: data.strGlass,
        instructions: data.strInstructions,
        drinkThumb: data.strDrinkThumb,
        ingredients: transformToDrinkIngredients(data),
        imageSource: data.strImageSource,
        imageAttribution: data.strImageAttribution,
        creativeCommonsConfirmed: data.strCreativeCommonsConfirmed,
        dateModified: data.dateModified
    };
}

function transformToDrinkIngredients(data: any) : Array<DrinkIngredient> {
    let ingredients: Array<DrinkIngredient> = [];

    for (let i = 1; i <= 15; i++) {
        let strIngredientX = "strIngredient" + i;

        if (data[strIngredientX] !== null) {
        let strMeasureX = "strMeasure" + i;

        ingredients.push({
                ingredient: data[strIngredientX],
                measure: data[strMeasureX]
            });
        }
    }

    return ingredients;
}

function transformToIngredient(data: any) : Ingredient {
    return {
        id: data.idIngredient,
        ingredient: data.strIngredient,
        description: data.strDescription,
        type: data.strType,
        alcohol: data.strAlcohol,
        ABV: data.strABV
    };
}
