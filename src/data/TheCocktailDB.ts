export interface Drink {
    id: String;
    drink: String;
    drinkAlternate: String | null;
    tags: Array<String> | null;
    video: String | null;
    category: String;
    IBA: String | null;
    alcoholic: String;
    glass: String;
    instructions: String;
    drinkThumb: String;
    ingredients: Array<Ingredient>;
    imageSource: String | null;
    imageAttribution: String | null;
    creativeCommonsConfirmed: String;
    dateModified: String;

}

export interface Ingredient {
    ingredient: String;
    measure: String | null;
}


export async function random() {
    return new Promise<Drink>((resolve, _) => {
        resolve(DRINK_1);
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
