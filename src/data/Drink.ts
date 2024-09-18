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
    ingredients: Array<DrinkIngredient>;
    imageSource: string | null;
    imageAttribution: string | null;
    creativeCommonsConfirmed: string;
    dateModified: string;
}

export interface DrinkIngredient {
    ingredient: string;
    measure: string | null;
}
