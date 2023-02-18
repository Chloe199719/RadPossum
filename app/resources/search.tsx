"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  data: any;
};
function Search({ data }: Props) {
  const [query, setQuery] = useState(``);
  const keys = ["title"];
  const search = (data: any) => {
    return data.filter((item: any) => {
      return (
        keys.some((key) =>
          item[key].toLowerCase().includes(query.toLowerCase())
        ) ||
        item.body.some((body: string) => {
          return body.toLowerCase().includes(query.toLowerCase());
        })
      );
    });
  };

  return (
    <nav className="flex flex-col  border border-black rounded-xl px-3 py-3 gap-2 ">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="search"
        className="px-2 py-1 rounded-md"
      />
      <ul className="text-xl flex flex-col gap-1 overflow-y-scroll h-[500px] ">
        {search(data.items).map((e: any) => {
          return (
            <Link key={e.id} href={`/resources/${e.id}`}>
              <li className=" py-2 px-10 rounded-lg hover:bg-sky-600">
                {e.title}
              </li>
            </Link>
          );
        })}
        {search(data.items).map((e: any) => {
          return (
            <Link key={e.id} href={`/resources/${e.id}`}>
              <li className=" py-2 px-10 rounded-lg hover:bg-sky-600">
                {e.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
export default Search;
