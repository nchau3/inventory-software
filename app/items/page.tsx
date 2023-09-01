'use client'

import Table from "../components/tables/table";
import SearchBar from "../components/tables/search-bar";
import { useCallback, useEffect, useState } from 'react';
import PaginationBar from "../components/tables/pagination-bar";

const columns = ["name", "sku", "qoh", "status", "last_modified"];

export default function Items() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({ page: 1 })
  const [isFetching, setIsFetching] = useState(false);
  const take = 50;
  const skip = (pagination.page - 1) * take;

  const searchHandler = useCallback(() => {
    setIsFetching(true);
    fetch(`http://localhost:3000/api/items/search?query=${query}&skip=${skip}&take=${take}`)
    .then(res => res.json())
    .then(data => {
      setItems(data);
      setIsFetching(false);
    });
  }, [query, pagination])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHandler();
    }, 300)
    
    return () => clearTimeout(timer);
  }, [searchHandler]);

  const changePage = (direction: "next" | "prev") => {
    if (direction === "next") {
      setPagination({page: (pagination.page + 1)})
    } else {
      const newPage = pagination.page - 1;
      if (newPage > 0) {
        setPagination({page: newPage});
      }
    }
  }

  return (
    <div className="max-w-[1200px]">
      <SearchBar path="items" value={query} onChange={setQuery} isLoading={isFetching}/>
      {items && 
      <div>
        <Table data={{ body: items, columns }}></Table>
        <PaginationBar currentPage={(pagination.page)} clickHandler={changePage} lastPage={items.length < take}/>
      </div>}
    </div>
  )
}
