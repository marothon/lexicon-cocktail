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

// Temporary data for test
const DRINK_1: Drink = {
    id: "17223",
    drink: "Abbey Martini",
    drinkAlternate: null,
    tags: null,
    video: null,
    category: "Cocktail",
    IBA: null,
    alcoholic: "Alcoholic",
    glass: "Cocktail glass",
    instructions: "Put all ingredients into a shaker and mix, then strain contents into a chilled cocktail glass.",
    drinkThumb: "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/2mcozt1504817403.jpg",
    ingredients: [
        {
            ingredient: "Gin",
            measure: "2 shots "
        },
        {
            ingredient: "Sweet Vermouth",
            measure: "1 shot "
        },
        {
            ingredient: "Orange Juice",
            measure: "1 shot "
        },
        {
            ingredient: "Angostura Bitters",
            measure: "3 dashes "
        }
    ],
    imageSource: null,
    imageAttribution: null,
    creativeCommonsConfirmed: "No",
    dateModified: "2017-09-07 21:50:03"
};

const DRINK_2: Drink = {
   id: "11007",
   drink: "Margarita",
   drinkAlternate: null,
   tags: ["IBA", "ContemporaryClassic"],
   video: null,
   category: "Ordinary Drink",
   IBA: "Contemporary Classics",
   alcoholic: "Alcoholic",
   glass: "Cocktail glass",
   instructions: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
   drinkThumb: "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/5noda61589575158.jpg",
   ingredients: [
        {
           ingredient: "Tequila",
           measure: "1 1\/2 oz "
        },
        {
           ingredient: "Triple sec",
           measure: "1\/2 oz "
        },
        {
           ingredient: "Lime juice",
           measure: "1 oz "
        },
        {
           ingredient: "Salt",
           measure: null
        }
    ],
   imageSource: "https:\/\/commons.wikimedia.org\/wiki\/File:Klassiche_Margarita.jpg",
   imageAttribution: "Cocktailmarler",
   creativeCommonsConfirmed: "Yes",
   dateModified: "2015-08-18 14:42:59"
};

const DRINK_3: Drink = {
   id: "11118",
   drink: "Blue Margarita",
   drinkAlternate: null,
   tags: null,
   video: null,
   category: "Ordinary Drink",
   IBA: null,
   alcoholic: "Alcoholic",
   glass: "Cocktail glass",
   instructions: "Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.",
   drinkThumb: "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/bry4qh1582751040.jpg",
   ingredients: [
        {
           ingredient: "Tequila",
           measure: "1 1\/2 oz "
        },
        {
           ingredient: "Blue Curacao",
           measure: "1 oz "
        },
        {
           ingredient: "Lime juice",
           measure: "1 oz "
        },
        {
           ingredient: "Salt",
           measure: "Coarse "
        }
    ],
   imageSource: null,
   imageAttribution: null,
   creativeCommonsConfirmed: "Yes",
   dateModified: "2015-08-18 14:51:53"
};
