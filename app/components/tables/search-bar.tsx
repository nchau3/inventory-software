"use client";

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
      <div className="mb-2 flex h-10 w-full items-center rounded-none border border-slate-400 bg-white px-2 shadow-md focus-within:border-2">
        <input
          className="h-full w-11/12 px-2 focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Search ${path}...`}
        ></input>
        {isLoading && (
          <div className="ml-auto h-6 w-6">
            <Spinner></Spinner>
          </div>
        )}
      </div>
    </form>
  );
}
