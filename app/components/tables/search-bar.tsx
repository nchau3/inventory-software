"use client";

import { useEffect, useState, useTransition } from "react";
import Spinner from "../ui/spinner";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  path: string;
}

export default function SearchBar({ path }: Props) {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (value) {
      startTransition(() => {
        router.push(`?search=${value}`)
      })
    } else {
      startTransition(() => {
        router.push(pathName);
      })
    }
  }, [value])

  return (
    <form>
      <div className="mb-2 flex h-10 w-full items-center rounded-none border border-slate-400 bg-white px-2 shadow-md focus-within:border-2">
        <input
          className="h-full w-11/12 px-2 focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Search ${path}...`}
        ></input>
        {isPending && (
          <div className="ml-auto h-6 w-6">
            <Spinner></Spinner>
          </div>
        )}
      </div>
    </form>
  );
}
