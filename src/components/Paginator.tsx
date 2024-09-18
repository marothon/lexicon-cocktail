import { MouseEventHandler, useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';

interface PaginatorProps{
  pageParams?: URLSearchParams;
  pageCount: number;
  handlePagination: (page: number) => void;
}

export default function Paginator({pageParams, pageCount, handlePagination}: PaginatorProps) {
  const [searchParams, _] = useSearchParams();
  const location = useLocation();
  const [page, setPage] = useState<number>(parseInt(searchParams.get('p') as string) ?? 1);
  
  useEffect(()=>{
    setPage(parseInt(searchParams.get('p') as string) ?? 1)
  }, [location]);

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
    <div className='pager'>
      <Link 
        className={`${page < 2 ? 'disabled' : ''} previous-page material-symbols-outlined`} 
        onClick={onClickHandler(-1)} 
        to={`?p=${page-1}${pageParams ? '&'+pageParams.toString() : ''}`}>
          chevron_left
      </Link> 
      <span className='current-page'>{page}/{pageCount}</span>
      <Link
        className={`${page >= pageCount ? 'disabled' : ''} next-page material-symbols-outlined`}
        onClick={onClickHandler(1)}
        to={`?p=${page+1}${pageParams ? '&'+pageParams.toString() : ''}`}>
          chevron_right
      </Link>
    </div>
  )
}
