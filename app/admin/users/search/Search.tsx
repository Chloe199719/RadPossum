"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import React, { useState } from "react";
import useDebounce from "./useDebounce";
import { User } from "@prisma/client";
import UserItem from "./UserItem";

type Props = {};

function Search({}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  async function fetchSearchResult(searchTerm: string) {
    try {
      const data = await axios.get(
        `/api/admin/users/search/?searchTerm=${searchTerm}`
      );

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
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full">
        {" "}
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="input w-full"
          type="search"
        />
      </div>
      <div className="w-full flex flex-col gap-2 border-2 border-gray-800 mx-2 px-2 py-4 rounded-lg">
        {search.isLoading ? (
          <p>is Loading</p>
        ) : search.data && search.data.length !== 0 ? (
          search.data.map((user: User) => {
            return <UserItem key={user.id} user={user} />;
          })
        ) : (
          <p>no data</p>
        )}
      </div>
    </div>
  );
}

export default Search;
