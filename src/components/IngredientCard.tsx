import { Link } from "react-router-dom";
import { DrinkIngredient } from "../data/Drink";

export default function IngredientCard({ingredient}: {ingredient: DrinkIngredient}) {
  const BASE_IMAGE_URL: string = 'http://www.thecocktaildb.com/images/ingredients';
 
  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <article className='ingredient-card'>
      <Link className='info-link' to={`/ingredient/${ingredient.ingredient}`}>
        <img src={`${BASE_IMAGE_URL}/${ingredient.ingredient}-Small.png`}/>
        <span className="material-symbols-outlined">info</span>
      </Link>
      <h4>{ingredient.ingredient}{ingredient.measure ? ' - '+capitalize(ingredient.measure) : ''}</h4>
    </article>
  )
}
