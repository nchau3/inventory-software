'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationBar from "./pagination-bar";
import SearchBar from "./search-bar";
import { useEffect, useState, useTransition } from "react";

interface searchBarProps {
    path: string;
}

interface filterBarProps {
    currentPage: number;
    lastPage: boolean;
    recordsDisplayed: number;
    totalRecords: number;
}

export default function TableClient({ searchProps, filterProps }: { searchProps: searchBarProps, filterProps: filterBarProps}) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get('search') || "";

    const { currentPage, lastPage, recordsDisplayed, totalRecords } = filterProps;

    const [searchQuery, setSearchQuery] = useState(query);
    const [page, setPage] = useState(currentPage);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const resetPage = searchQuery !== query ? 1 : page;
        const pageString = page ? `&page=${resetPage}` : "";
        if (searchQuery || page !== currentPage) {
          startTransition(() => {
            router.replace(`?search=${searchQuery}${pageString}`)
          })
        } else {
          startTransition(() => {
            router.replace(pathName);
          })
        }
      }, [searchQuery, page]);

    return (
        <>
            <SearchBar key="searchBar" path={searchProps.path} value={searchQuery} onChange={setSearchQuery} isLoading={isPending}></SearchBar>
            <PaginationBar onClick={setPage} currentPage={currentPage} lastPage={lastPage} recordsDisplayed={recordsDisplayed} totalRecords={totalRecords} isLoading={isPending}></PaginationBar>
        </>
    )
}