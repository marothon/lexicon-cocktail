import { MouseEventHandler, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

interface PaginatorProps{
  pageCount: number,
  searchedTerm: string,
  handlePagination: (page: number) => void
}

export default function CocktailSearchPaginator({searchedTerm, pageCount, handlePagination}: PaginatorProps) {
  const [searchParams, _] = useSearchParams();
  const [page, setPage] = useState<number>(parseInt(searchParams.get('p') as string) ?? 1);
  

  const onClickHandler = (pageChange: number): MouseEventHandler<HTMLAnchorElement> => {
    return (e) => { 
      if(page + pageChange >= 1 && page + pageChange <= pageCount){
        setPage(p =>  p +  pageChange);
        handlePagination(page +  pageChange);
      } else {
        e.preventDefault();
      }
    }
  }

  return (
    <div className='search-result-pager'>
      <Link 
        className={`${page < 2 ? 'disabled' : ''} previous-page material-symbols-outlined`} 
        onClick={onClickHandler(-1)} 
        to={`?q=${searchedTerm}&p=${page-1}`}>
          chevron_left
      </Link> 
      <span className='current-page'>{page}/{pageCount}</span>
      <Link
        className={`${page >= pageCount ? 'disabled' : ''} next-page material-symbols-outlined`}
        onClick={onClickHandler(1)}
        to={`?q=${searchedTerm}&p=${page+1}`}>
          chevron_right
      </Link>
    </div>
  )
}
