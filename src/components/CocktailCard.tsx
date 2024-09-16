import * as CocktailDB from '../data/TheCocktailDB'

export default function CocktailCard({drink}: {drink: CocktailDB.Drink}) {
  return (
    <article className='cocktail-card'>
      <img src={drink.drinkThumb as string}/>
      <span className="info-icon material-symbols-outlined">info</span>
      <div className="info-container">
        <h4>{drink.drink}</h4>  
      </div>
    </article>
  )
}
