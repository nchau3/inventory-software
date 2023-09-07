'use client'

import Table from "../components/tables/table";
import SearchBar from "../components/tables/search-bar";
import PaginationBar from "../components/tables/pagination-bar";
import { useEffect, useState, useTransition } from "react";

interface itemsResponse {
  items: [];
  columns: [];
  lastPage: boolean;
  totalRecords: number;
}

export default function Items() {
  const [itemsData, setItemsData] = useState<itemsResponse>({
    items: [],
    columns: [],
    lastPage: false,
    totalRecords: 0
  });
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const take = 50;
  const skip = page === 1 ? 0 : (page - 1) * take;

  const fetchItems = async () => {
    const res = await fetch(`api/items/search?q=${query}&page=${page}&skip=${skip}&take=${take}`)
    if (!res.ok) {
      console.log(res.statusText);
      throw new Error(res.statusText)
    }
    const data = await res.json();
    startTransition(() => {
      setItemsData(data);
    })
  }

  //page 1 on query change
  useEffect(() => {
    setPage(1);
    fetchItems();
    return;    
  }, [query]);

  useEffect(() => {
    fetchItems();
    return;
  }, [page]);

  const { items, columns, totalRecords } = itemsData;

  return (
    <div className="px-10 max-w-[1200px]">
      <SearchBar path="items" value={query} onChange={setQuery} isLoading={isPending}></SearchBar>
      <PaginationBar currentPage={page} onClick={setPage} totalRecords={totalRecords} recordsDisplayed={items.length} isLoading={isPending}></PaginationBar>
      <Table body={items} path="items" columns={columns} ></Table>
    </div>
  );
}