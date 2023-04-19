"use client";
import React from "react";

type Props = {};

function Search({}: Props) {
  return (
    <div className="w-full">
      <div className="">
        {" "}
        <input className="input w-full" type="search" />{" "}
        {/* <button className="btn bg-gray-400 hover:bg-gray-600 border-0">
          Search
        </button> */}
      </div>
    </div>
  );
}

export default Search;
