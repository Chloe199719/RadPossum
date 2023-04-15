import React from "react";
import CreateForm from "./CreateForm";

type Props = {};

function Page({}: Props) {
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <h2 className="text-3xl">Create New Article</h2>
      <CreateForm />
    </div>
  );
}

export default Page;
