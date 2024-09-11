import { FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as CocktailDB from '../data/TheCocktailDB';

export default function SearchPage() {
  const [searchParams, _] = useSearchParams();
  const [page, setPage] = useState<number>(parseInt(searchParams.get('p') ?? '1'));
  const [displayedSearchResult, setDisplayedSearchResult] = useState<CocktailDB.Drink[]>();
  const searchResult = useRef<CocktailDB.Drink[]>();
  const [pageCount, setPageCount] = useState<number>(1);
  const navigate = useNavigate();
  const [searchedTerm, setSearchedTerm] = useState<string>(searchParams.get('p')??'');

  const performSearch = async (searchTerm: string) => {
    searchResult.current = await CocktailDB.search(searchTerm);
    setSearchedTerm(searchTerm);
    displaySearchResult(searchResult.current, page);
  };

  const displaySearchResult = (result: CocktailDB.Drink[], page: number) => {
    setPageCount(Math.ceil(result.length/10));
    setDisplayedSearchResult(result.slice( (page-1)*10, page*10));
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm: string = formData.get('searchTerm') as string;

    setPage(1);
    if(searchTerm){
      navigate(`?q=${searchTerm}&p=1`);
      performSearch(searchTerm);
    } else {
      navigate('');
      setDisplayedSearchResult([]);
      setPageCount(1);
      searchResult.current = undefined;
    }
  }

  useEffect(() => {
    const searchTerm: string = searchParams.get('q') as string;

    if(searchTerm){
      setPage(parseInt(searchParams.get('p') as string) ?? 1);
      performSearch(searchTerm);
    }
  }, []);

  const handlePagination = (pageChange: number): MouseEventHandler<HTMLAnchorElement> => {
    return (e) => {
      if(page + pageChange >= 1 && page + pageChange <= pageCount){
        setPage(p => {
          displaySearchResult(searchResult.current??[], p + pageChange);
          return p + pageChange
        });
      } else {
        e.preventDefault();
      }
    }
  };

  return (
    <div className='search-page'>
      <form onSubmit={handleOnSubmit}>
        <input id='searchTerm' placeholder='Search by drink name' name='searchTerm' type="text" defaultValue={searchParams.get('q') ?? ''}/>
      </form>
      {
        searchResult.current ? 
          <div className='search-result-pager'>
            <Link 
              className={`${page < 2 ? 'disabled' : ''} previous-page material-symbols-outlined`} 
              onClick={handlePagination(-1)} 
              to={`?q=${searchedTerm}&p=${page-1}`}>
                chevron_left
            </Link> 
            <span className='current-page'>{page}/{pageCount}</span>
            <Link
              className={`${page >= pageCount ? 'disabled' : ''} next-page material-symbols-outlined`}
              onClick={handlePagination(1)}
              to={`?q=${searchedTerm}&p=${page+1}`}>
                chevron_right
            </Link>
          </div>
        :
        null
      }
      <div className='search-result-list'>
        {
          displayedSearchResult?.map((drink) => {
            return (
              <article key={drink.id as string} className='search-result-drink'>
                <img src={drink.drinkThumb as string}/>
                <span className="info-icon material-symbols-outlined">info</span>
                <div className="info-container">
                  <h4>{drink.drink}</h4>  
                </div>
              </article>
            )
          })
        }
      </div>
    </div>
  )
}
