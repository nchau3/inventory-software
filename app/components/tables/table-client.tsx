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
        const pageString = page ? `&page=${page}` : "";
        if (searchQuery || page !== currentPage) {
          startTransition(() => {
            router.push(`?search=${searchQuery}${pageString}`)
          })
        } else {
          startTransition(() => {
            router.push(pathName);
          })
        }
      }, [searchQuery, page]);

    return (
        <>
            <SearchBar path={searchProps.path} value={searchQuery} onChange={setSearchQuery} isLoading={isPending}></SearchBar>
            <PaginationBar onClick={setPage} currentPage={page} lastPage={lastPage} recordsDisplayed={recordsDisplayed} totalRecords={totalRecords} isLoading={isPending}></PaginationBar>
        </>
    )
}