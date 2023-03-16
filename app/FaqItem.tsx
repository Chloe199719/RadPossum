"use client";
import React, { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { Questions } from "@prisma/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

import Image from "next/image";
import { H1, H2, H3, H4, H6, H5 } from "@/components/ReactMarkDown/Headings";
import { Li, Ol, Ul } from "@/components/ReactMarkDown/Lists";
import { A, IMG } from "@/components/ReactMarkDown/LinksImages";
import { PTag } from "@/components/ReactMarkDown/Paragraph";
type Props = {
  data: Questions;
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
            <ReactMarkdown
              components={{
                h1: H1,
                h2: H2,
                h3: H3,
                h4: H4,
                h5: H5,
                h6: H6,
                ul: Ul,
                ol: Ol,
                li: Li,
                a: (a) => {
                  return <A href={a.href!}>{a.children}</A>;
                },
                img: (a) => {
                  return <IMG src={a.src!} alt={a.alt!} />;
                },
                p: PTag,
              }}
              remarkPlugins={[remarkGfm]}
              className="blog-style"
            >
              {data.answer}
            </ReactMarkdown>
          </div>
        ) : null}
      </button>
    </div>
  );
}
export default FaqItem;
