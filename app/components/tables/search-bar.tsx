'use client'

import { useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const searchhhh = searchParams.get('search');
    console.log(searchhhh);
    const [query, setQuery] = useState("");

    async function search(formData: FormData, callback: Function) {
        const response = await callback(formData);
        return response;
    }
    return (
        <form>
            <input 
                className="shadow-md border border-slate-400 w-full h-10 p-2 mb-2 rounded-none"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ></input>
        </form>
    )
}