import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from "react";
import * as CocktailDB from "../data/TheCocktailDB";
import { Drink } from "../data/Drink";

export interface CocktailSearchResult {
  drinks: Drink[],
  searchTerm?: string,
  category?: string,
  glass?: string,
  alcohol?: string
}

export interface CocktailSearchFormProps {
  defaultSearchTerm: string,
  onSearch: (result: CocktailSearchResult) => void 
}

export default function CocktailSearchForm({onSearch, defaultSearchTerm}: CocktailSearchFormProps) {
  const [categories, setCategories] = useState<string[]>();
  const [glasses, setGlasses] = useState<string[]>();
  const [alcoholTypes, setAlcoholTypes] = useState<string[]>();
  const [filteredCategory, setFilteredCategory] = useState<string>();
  const [filteredGlass, setFilteredGlass] = useState<string>();
  const [filteredAlcoholType, setFilteredAlcoholType] = useState<string>();
  const [showFilterSettings, setShowFilterSettings] = useState<boolean>(false);
  const searchResult = useRef<{searchTerm: string, drinks: Drink[]}>();

  const performSearch = async (searchTerm: string) => {
    return await CocktailDB.search(searchTerm);
  };

  const filterSearch = (result: Drink[]) => {
    return result.filter(d => {
      let include = true;
      include = filteredCategory ? filteredCategory == d.category && include : include;
      include = filteredGlass ? filteredGlass == d.glass && include: include;
      include = filteredAlcoholType ? filteredAlcoholType == d.alcoholic && include : include;
      return include;
    })
  };

  useEffect(() => {
    const onLoadSearch = async () => {
      if(defaultSearchTerm!==''){
        const drinks = await performSearch(defaultSearchTerm)
        searchResult.current = {searchTerm: defaultSearchTerm, drinks: drinks};
        const result = filterSearch(searchResult.current.drinks);
        onSearch({drinks: result, searchTerm: defaultSearchTerm});    
      }
      // Fetch the static lists 
      setAlcoholTypes(await CocktailDB.allAlcoholTypes());
      setGlasses(await CocktailDB.allGlasses());
      setCategories(await CocktailDB.allCategories());
    }
    onLoadSearch(); 
  }, []);

  useEffect(() => {
    if(searchResult.current){
      const result = filterSearch(searchResult.current.drinks);
      onSearch({drinks: result, searchTerm: searchResult.current.searchTerm});
    }
  }, [filteredCategory, filteredGlass, filteredAlcoholType])

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm: string = formData.get('searchTerm') as string;
    
    if(searchTerm){
      const drinks = await performSearch(searchTerm);
      searchResult.current = {searchTerm: searchTerm, drinks: drinks};
      const result = filterSearch(searchResult.current.drinks);
      onSearch({drinks: result, searchTerm: searchTerm});
    } else {
      onSearch({drinks: []});
    }
  }

  const handleOnFilterChange: ChangeEventHandler<HTMLSelectElement> = async (e)  => {
    const filter = e.target as HTMLSelectElement;
    switch(filter.name){
      case 'category': 
        setFilteredCategory(filter.value);
        break;
      case 'glass': 
        setFilteredGlass(filter.value);
        break;
      case 'alcoholType':
        setFilteredAlcoholType(filter.value);
        break;
    }
  }
  
  return (
    <form className='cocktail-search-form' onSubmit={handleOnSubmit}>
        <div className='search-bar-container'>
          <input id='searchTerm' placeholder='Search by drink name' name='searchTerm' type="text" defaultValue={defaultSearchTerm}/>
          <span className='toggle-filter-settings material-symbols-outlined' onClick={()=>{setShowFilterSettings(sfs => !sfs)}}>settings</span>
        </div>
        <div className={`filter-settings-container ${showFilterSettings ? '' : 'hidden'}`}>
          <select name='category' onChange={handleOnFilterChange}>
            <option label='-- Select category --'></option>
            {categories?.map(category => <option key={category} value={category}>{category}</option>)} 
          </select>
          <select name='glass' onChange={handleOnFilterChange}>
            <option label='-- Select glass --'></option>
            {glasses?.map(glass => <option key={glass} value={glass}>{glass}</option>)}
          </select>
          <select name='alcoholType' onChange={handleOnFilterChange}>
            <option label='-- Select alcohol type --'></option>
            {alcoholTypes?.map(alcoholType => <option key={alcoholType} value={alcoholType}>{alcoholType}</option>)}
          </select>
        </div>
    </form>
  )
}
