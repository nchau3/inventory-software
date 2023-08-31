'use client'

import Table from "../components/tables/table";
import SearchBar from "../components/tables/search-bar";
import { useCallback, useEffect, useState } from 'react';

const columns = ["name", "sku", "qoh", "status", "last_modified"];

export default function Items() {
  const [items, setItems] = useState();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = useCallback(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/api/items/search?q=${query}`)
    .then(res => res.json())
    .then(data => {
      setItems(data);
      setIsLoading(false);
    });
  }, [query])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHandler();
    }, 300)
    
    return () => clearTimeout(timer);
  }, [searchHandler]);


  return (
    <>
      <SearchBar path="items" value={query} onChange={setQuery} isLoading={isLoading}/>
      {items && <Table data={{ body: items, columns }}></Table>}
    </>
  )
}
