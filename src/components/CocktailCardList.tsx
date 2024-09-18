import CocktailCard from "./CocktailCard"
import { Drink } from "../data/Drink"

export default function CocktailCardList({cocktails}:{ cocktails: Drink[]}) {
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
