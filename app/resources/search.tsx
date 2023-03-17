"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  data: any;
};
function Search({ data }: Props) {
  const [query, setQuery] = useState(``);
  const [open, setOpen] = useState(true);
  const keys = ["title", `body`];
  const search = (data: any) => {
    return data?.filter((item: any) => {
      return keys.some((key) =>
        item[key].toLowerCase().includes(query.toLowerCase())
      );
      // item.body.some((body: string) => {
      //   return body.toLowerCase().includes(query.toLowerCase());
      // })
    });
  };
  if (!open) {
    return (
      <svg
        onClick={() => {
          setOpen(!open);
        }}
        className=" w-10 h-10 inline absolute left-0 top-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </svg>
    );
  }

  return (
    <nav className="flex flex-col  border border-black rounded-xl px-3 py-3 gap-2 w-1/4 ">
      <div className="flex">
        <svg
          onClick={() => {
            setOpen(!open);
          }}
          className=" w-10 h-10 inline "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          type="search"
          placeholder="Search"
          className="input px-2 py-1 rounded-md flex-1 mx-2"
        />
      </div>
      <ul className="text-xl flex flex-col gap-1 overflow-y-scroll max-h-[500px] ">
        {search(data).map((e: any) => {
          return (
            <Link key={e.id} href={`/resources/${e.id}`}>
              <li className=" py-2 px-2 rounded-lg hover:bg-[#30bead]/30">
                <p className="truncate"> {e.title}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
export default Search;
