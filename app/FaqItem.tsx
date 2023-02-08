"use client";
import React, { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

type Props = {
  data: {
    id: number;
    question: string;
    answer: string;
    link?: string;
  };
};
function FaqItem({ data }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div key={data.answer} className="flex flex-col ">
      <button
        className="focus:outline-1 outline-gray-200 "
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        <div
          className={`flex justify-between p-4  bg-zinc-50  hover:bg-gray-200`}
          // border border-black ${open ? "border-b" : "border-b-0"}`
        >
          <h6 className=" text-lg">{data.question}</h6>{" "}
          {open ? (
            <ArrowDownIcon className="w-6 h-6" />
          ) : (
            <ArrowUpIcon className="w-6 h-6" />
          )}
        </div>
        {open ? (
          <div
            onClick={(e) => {
              setOpen(!open);
            }}
            className="p-4 bg-gray-300 border-t border-black text-left"
          >
            {data.answer}
          </div>
        ) : null}
      </button>
    </div>
  );
}
export default FaqItem;
