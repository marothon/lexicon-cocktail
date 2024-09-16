import CocktailCard from "./CocktailCard"
import * as CocktailDB from "../data/TheCocktailDB"

export default function CocktailCardList({cocktails}:{ cocktails: CocktailDB.Drink[]}) {
  return (
    <div className='cocktail-card-list'>
      {
        cocktails.map((drink) => {
          return (
            <CocktailCard key={drink.id as string} drink={drink} />
          )
        })
      }
    </div>  )
}
