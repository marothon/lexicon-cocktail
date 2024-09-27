import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Drink } from '../data/Drink';
import CocktailSearchForm, { CocktailSearchResult } from '../components/CocktailSearchForm';
import Paginator from '../components/Paginator';
import CocktailCardList from '../components/CocktailCardList';

export default function SearchPage() {
  const [searchedTerm, setSearchedTerm] = useState<string>();
  const [pagedSearchResult, setPagedSearchResult] = useState<Drink[]>();
  const searchResult = useRef<Drink[]>();
  const [pageCount, setPageCount] = useState<number>(1);
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const pageSize: number = 10;

  const displaySearchResult = (result: Drink[], page: number) => {
    setPageCount(Math.ceil(result.length/pageSize));
    setPagedSearchResult(result.slice( (page-1)*pageSize, page*pageSize));
  }

  const handlePagination = (page: number) => {
    displaySearchResult(searchResult.current??[], page);
  };

  const handleOnSearch = ({drinks, searchTerm}: CocktailSearchResult) => {
    if(searchTerm){
      let page: number = searchTerm != searchedTerm ? 1 : parseInt(searchParams.get('p') as string) || 1;
      while(page > Math.ceil(drinks.length/pageSize)){
        page--;
      }
      navigate(`?p=${page}&q=${searchTerm}`);
      setSearchedTerm(searchTerm as string);
      displaySearchResult(drinks, page);
      searchResult.current = drinks;
    } else {
      navigate('');
      setSearchedTerm(undefined);
      displaySearchResult([], 1);
      searchResult.current = undefined;
    }
  };

  const pageParams = new URLSearchParams();
  if(searchedTerm) {
    pageParams.append('q', searchedTerm);
  }
  
  return (
    <div className='search-page'>
      <CocktailSearchForm onSearch={handleOnSearch} defaultSearchTerm={searchParams.get('q') ?? ''}/>
      { // Only show paginator if we have a search result to show
        searchResult.current && searchResult.current.length > 0 ?
        <Paginator
          pageCount={pageCount}
          pageParams={pageParams}
          handlePagination={handlePagination}
        />
        :
        null
      }
      {
        pagedSearchResult && pagedSearchResult.length > 0?
          <CocktailCardList cocktails={pagedSearchResult} />
          :
          searchResult.current && pagedSearchResult?.length  == 0 ?
            <h1>No drinks found!</h1>
            :
            null
      }
    </div>
  )
}
