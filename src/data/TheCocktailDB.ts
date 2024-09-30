import { Drink, DrinkIngredient } from "./Drink";
import { Ingredient } from "./Ingredient";
import * as Cache from "./Cache";

const THE_COCKTAIL_DB_API_BASE_URL: string = "https://www.thecocktaildb.com/api/json/v1/1/";


export async function random() : Promise<Drink> {
    return requestEndpoint<Drink>({
        endpointUri: "random.php",
        test: data => data.drinks[0],
        transform: data => transformToDrink(data.drinks[0])
    });
}

export async function search(query: string) : Promise<Array<Drink>> {
    return requestEndpoint<Array<Drink>>({
        endpointUri: "search.php",
        test: data => Array.isArray(data.drinks),
        transform: data => data.drinks.map(transformToDrink),
        parameters: [{key: "s", value: query}]
    });
}

export async function searchIngredient(query: string) : Promise<Ingredient> {
    return requestEndpoint<Ingredient>({
        endpointUri: "search.php",
        test: data => data.ingredients[0],
        transform: data => transformToIngredient(data.ingredients[0]),
        parameters: [{key: "i", value: query}],
        useCache: true
    });
}

export async function lookupDrink(id: string) : Promise<Drink> {
    return requestEndpoint<Drink>({
        endpointUri: "lookup.php",
        test: data => data.drinks[0],
        transform: data => transformToDrink(data.drinks[0]),
        parameters: [{key: "i", value: id}],
        useCache: true
    });
}

export async function lookupIngredient(id: string) : Promise<Ingredient> {
    return requestEndpoint<Ingredient>({
        endpointUri: "lookup.php",
        test: data => data.ingredients[0],
        transform: data => transformToIngredient(data.ingredients[0]),
        parameters: [{key: "iid", value: id}],
        useCache: true
    });
}

export async function filterByIngredient(ingredientName: string) : Promise<Drink[]> {
    return requestEndpoint<Drink[]>({
        endpointUri: 'filter.php',
        test: data => data.drinks,
        transform: data => data.drinks.map((d: any) => transformToDrink(d)),
        parameters: [{key: 'i', value: ingredientName}],
        useCache: true
    });
}

export async function allIngredients() : Promise<string[]> {
    return requestEndpoint<string[]>({
        endpointUri: 'list.php',
        test: data => data.drinks,
        transform: data => data.drinks.map((d: any) => d.strIngredient1),
        parameters: [{key: 'i', value: 'list'}],
        useCache: true
    });
}

export async function allCategories() : Promise<string[]> {
    return requestEndpoint<string[]>({
        endpointUri: 'list.php',
        test: data => data.drinks,
        transform: data => data.drinks.map((d: any) => d.strCategory),
        parameters: [{key: 'c', value: 'list'}],
        useCache: true
    });
}

export async function allGlasses() : Promise<string[]> {
    return requestEndpoint<string[]>({
        endpointUri: 'list.php',
        test: data => data.drinks,
        transform: data => data.drinks.map((d: any) => d.strGlass),
        parameters: [{key: 'g', value: 'list'}],
        useCache: true
    });
}

export async function allAlcoholTypes() : Promise<string[]> {
    return requestEndpoint<string[]>({
        endpointUri: 'list.php',
        test: data => data.drinks,
        transform: data => data.drinks.map((d: any) => d.strAlcoholic),
        parameters: [{key: 'a', value: 'list'}],
        useCache: true
    });
}

interface EndpointConfig<T> {
    endpointUri: string;
    test: (data: any) => boolean;
    transform: (data: any) => T;
    parameters?: Array<{key: string, value: string}>;
    useCache?: boolean;
}

async function requestEndpoint<T>(config: EndpointConfig<T>): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        try {
            let paramString: string = "";
            if (config.parameters && config.parameters.length > 0) {
                paramString = "?" + config.parameters.map(
                        (parameter) => encodeURI(parameter.key) + "=" + encodeURI(parameter.value)
                    ).join();
            }

            let cacheId = config.endpointUri + paramString;
            let data;

            if (config.useCache && Cache.exists(cacheId)) {
                data = Cache.retrieve(cacheId);
            } else {
                const response = await fetch(THE_COCKTAIL_DB_API_BASE_URL + config.endpointUri + paramString);
                if (!response.ok) {
                    console.log("Network response was not ok");
                    reject("Network response was not ok.");
                }
                data = await response.json();

                if (config.useCache) {
                    Cache.store(cacheId, data);
                }
            }

            if (config.test(data)) {
                resolve(config.transform(data));
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
