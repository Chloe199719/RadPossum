"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import React, { useState } from "react";
import useDebounce from "./useDebounce";

type Props = {};

function Search({}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  async function fetchSearchResult(searchTerm: string) {
    try {
      const data = await axios.get(
        `/api/admin/users/search/?searchTerm=${searchTerm}`
      );
      console.log(data.data);
      return data.data;
    } catch (error: any) {
      return error.message;
    }
  }
  const search = useQuery({
    queryKey: ["search", debouncedSearchTerm],

    queryFn: async () => fetchSearchResult(debouncedSearchTerm),
    enabled: Boolean(debouncedSearchTerm),
  });

  return (
    <div className="w-full">
      <div className="">
        {" "}
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="input w-full"
          type="search"
        />{" "}
        {/* <button className="btn bg-gray-400 hover:bg-gray-600 border-0">
          Search
        </button> */}
        <p>
          {search.isLoading ? "is Loading" : "notloading"} ,{" "}
          {search.isError ? "is Error" : "notError"}
        </p>
        <p>
          {search.data && search.data.length !== 0
            ? JSON.stringify(search.data)
            : "no data"}
        </p>
      </div>
    </div>
  );
}

export default Search;
