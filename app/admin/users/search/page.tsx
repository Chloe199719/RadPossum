import React from "react";
import Search from "./Search";

type Props = {};

function Page({}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className=" text-3xl text-center">Search User</h2>
      <Search />
    </div>
  );
}

export default Page;
