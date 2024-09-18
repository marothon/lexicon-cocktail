import { Drink } from '../data/Drink'
import FavoriteButton from './FavoriteButton'

export default function CocktailCard({drink}: {drink: Drink}) {
  return (
    <article className='cocktail-card'>
      <img src={drink.drinkThumb as string}/>
      <span className="info-icon material-symbols-outlined">info</span>
      <span className="favorite-button-container">
        <FavoriteButton drink={drink} />
      </span>
      <div className="info-container">
        <h4>{drink.drink}</h4>
      </div>
    </article>
  )
}
