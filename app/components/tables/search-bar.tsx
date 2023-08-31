'use client'

import Spinner from "../ui/spinner";

interface Props {
    path: string;
    value: string;
    onChange: Function;
    isLoading: boolean;
}

export default function SearchBar({ path, value, onChange, isLoading }: Props) {
    return (
        <form>
            <div className="flex px-2 items-center shadow-md border focus-within:border-2 bg-white border-slate-400 w-full h-10 mb-2 rounded-none">
                <input 
                    className="w-11/12 h-full px-2 focus:outline-none"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={`Search ${path}...`}
                    ></input>
                {isLoading && <Spinner></Spinner>}
            </div>
        </form>
    )
}