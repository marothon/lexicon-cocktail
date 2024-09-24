import { FormEventHandler, useEffect } from "react";
import * as CocktailDB from "../data/TheCocktailDB";
import { Drink } from "../data/Drink";

export interface CocktailSearchResult {
  drinks: Drink[],
  searchTerm: string | null
}

export interface CocktailSearchFormProps {
  defaultSearchTerm: string,
  onSearch: (result: CocktailSearchResult) => void 
}

export default function CocktailSearchForm({onSearch, defaultSearchTerm}: CocktailSearchFormProps) {
  const performSearch = async (searchTerm: string) => {
    return await CocktailDB.search(searchTerm);
  };

  useEffect(() => {
    if(defaultSearchTerm!==''){
      const onLoadSearch = async () => {
        let result = await performSearch(defaultSearchTerm);
        onSearch({drinks: result, searchTerm: defaultSearchTerm});    
      }
      onLoadSearch();
    }
  }, []);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm: string = formData.get('searchTerm') as string;

    if(searchTerm){
      let result = await performSearch(searchTerm);
      onSearch({drinks: result, searchTerm: searchTerm});
    } else {
      onSearch({drinks: [], searchTerm: null});
    }
  }
  
  return (
    <form className='cocktail-search-form' onSubmit={handleOnSubmit}>
        <input id='searchTerm' placeholder='Search by drink name' name='searchTerm' type="text" defaultValue={defaultSearchTerm}/>
    </form>
  )
}
