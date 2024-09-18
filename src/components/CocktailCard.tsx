import { Drink } from '../data/Drink'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

export default function CocktailCard({drink}: {drink: Drink}) {
  return (
    <article className='cocktail-card'>
      <img src={drink.drinkThumb as string}/>
      <Link className='info-icon' to={`/cocktail/${drink.id}`}>
        <span className="material-symbols-outlined">info</span>
      </Link>
      <span className="favorite-button-container">
        <FavoriteButton drink={drink} />
      </span>
      <div className="info-container">
        <h4>{drink.drink}</h4>
      </div>
    </article>
  )
}
