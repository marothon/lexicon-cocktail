import * as CocktailDB from '../data/TheCocktailDB'

export default function CocktailSearchResultCard({drink}: {drink: CocktailDB.Drink}) {
  return (
    <article className='search-result-drink'>
      <img src={drink.drinkThumb as string}/>
      <span className="info-icon material-symbols-outlined">info</span>
      <div className="info-container">
        <h4>{drink.drink}</h4>  
      </div>
    </article>
  )
}
