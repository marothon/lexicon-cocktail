import { useContext, useState } from 'react'
import { GlobalStateContext } from '../context/GlobalStateContext'
import { Drink } from '../data/Drink';

export default function FavoriteButton({drink}: {drink: Drink}) {
  const { toggleFavorite, isFavorite } = useContext(GlobalStateContext);
  const [favorited, setFavorited] = useState<boolean>(isFavorite(drink))
  const handleOnClick = () => setFavorited(toggleFavorite(drink));

  return (
    <span
      className={`toggle-favorite ${favorited ? 'favorited' : ''} material-symbols-outlined`} 
      onClick={handleOnClick}>
        favorite
    </span>
  )
}
