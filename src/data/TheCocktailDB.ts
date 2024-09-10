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


export async function random() {
    return new Promise<Drink>((resolve, _) => {
        resolve(DRINK_1);
    });
}

export async function search(query: String) {
    return new Promise<Array<Drink>>((resolve, _) => {
        resolve([DRINK_2, DRINK_3]);
    });
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
