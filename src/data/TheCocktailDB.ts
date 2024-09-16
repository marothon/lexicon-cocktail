export interface Drink {
    id: string;
    drink: string;
    drinkAlternate: string | null;
    tags: Array<string> | null;
    video: string | null;
    category: string;
    IBA: string | null;
    alcoholic: string;
    glass: string;
    instructions: string;
    drinkThumb: string;
    ingredients: Array<Ingredient>;
    imageSource: string | null;
    imageAttribution: string | null;
    creativeCommonsConfirmed: string;
    dateModified: string;
}

export interface Ingredient {
    ingredient: string;
    measure: string | null;
}

const THE_COCKTAIL_DB_API_BASE_URL: string = "https://www.thecocktaildb.com/api/json/v1/1/";


export async function random() {
    const ENDPOINT_URI: string = "random.php";

    return new Promise<Drink>(async (resolve, reject) => {
        try {
            const response = await fetch(THE_COCKTAIL_DB_API_BASE_URL + ENDPOINT_URI);
            if (!response.ok) {
                console.log("Network response was not ok");
                reject("Network response was not ok.");
            }
            const data = await response.json();

            if (data.drinks[0]) {
                resolve(transformToDrink(data.drinks[0]));
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

export async function search(query: string) {
    const ENDPOINT_URI: string = "search.php";

    return new Promise<Array<Drink>>(async (resolve, reject) => {
        try {
            const response = await fetch(THE_COCKTAIL_DB_API_BASE_URL + ENDPOINT_URI +"?s=" + encodeURI(query));
            if (!response.ok) {
                console.log("Network response was not ok");
                reject("Network response was not ok.");
            }
            const data = await response.json();

            if (Array.isArray(data.drinks)) {
                resolve(data.drinks.map(transformToDrink));
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

export async function lookupDrink(id: string) {
    const ENDPOINT_URI: string = "lookup.php";

    return new Promise<Drink>(async (resolve, reject) => {
        try {
            const response = await fetch(THE_COCKTAIL_DB_API_BASE_URL + ENDPOINT_URI +"?i=" + encodeURI(id));
            if (!response.ok) {
                console.log("Network response was not ok");
                reject("Network response was not ok.");
            }
            const data = await response.json();

            if (data.drinks[0]) {
                resolve(transformToDrink(data.drinks[0]));
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
        ingredients: transformToIngredients(data),
        imageSource: data.strImageSource,
        imageAttribution: data.strImageAttribution,
        creativeCommonsConfirmed: data.strCreativeCommonsConfirmed,
        dateModified: data.dateModified
    };
}

function transformToIngredients(data: any) : Array<Ingredient> {
    let ingredients: Array<Ingredient> = [];

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
