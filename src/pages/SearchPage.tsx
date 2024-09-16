import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as CocktailDB from '../data/TheCocktailDB';
import Paginator from '../components/Paginator';
import CocktailCardList from '../components/CocktailCardList';

export default function SearchPage() {
  const [searchParams, _] = useSearchParams();
  const [pagedSearchResult, setDisplayedSearchResult] = useState<CocktailDB.Drink[]>();
  const searchResult = useRef<CocktailDB.Drink[]>();
  const [pageCount, setPageCount] = useState<number>(1);
  const navigate = useNavigate();
  const [searchedTerm, setSearchedTerm] = useState<string>(searchParams.get('p')??'');

  const performSearch = async (searchTerm: string) => {
    searchResult.current = await CocktailDB.search(searchTerm);
    setSearchedTerm(searchTerm);
    displaySearchResult(searchResult.current, parseInt(searchParams.get('p') ?? '1'));
  };

  const displaySearchResult = (result: CocktailDB.Drink[], page: number) => {
    setPageCount(Math.ceil(result.length/10));
    setDisplayedSearchResult(result.slice( (page-1)*10, page*10));
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm: string = formData.get('searchTerm') as string;

    if(searchTerm){
      navigate(`?p=1&q=${searchTerm}`);
      performSearch(searchTerm);
    } else {
      navigate('');
      setDisplayedSearchResult([]);
      setPageCount(1);
      searchResult.current = undefined;
    }
  }

  const handlePagination = (page: number) => {
    displaySearchResult(searchResult.current??[], page);
  };

  useEffect(() => {
    const searchTerm: string = searchParams.get('q') as string;

    if(searchTerm){
      performSearch(searchTerm);
    }
  }, []);

  return (
    <div className='search-page'>
      <form onSubmit={handleOnSubmit}>
        <input id='searchTerm' placeholder='Search by drink name' name='searchTerm' type="text" defaultValue={searchParams.get('q') ?? ''}/>
      </form>
      { // Only show paginator if we have a search result to show
        searchResult.current ? 
        <Paginator
          pageCount={pageCount}
          pageParams={new URLSearchParams({'q': searchedTerm})}
          handlePagination={handlePagination}
        />
        :
        null
      }
      {
        pagedSearchResult ?
          <CocktailCardList cocktails={pagedSearchResult} />
          :
          null
      }
    </div>
  )
}
