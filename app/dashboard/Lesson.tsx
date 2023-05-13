"use client";
import React, { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { lessons } from "@prisma/client";
import dynamic from "next/dynamic";
const Time = dynamic(() => import("../../components/time/Time"), {
  ssr: false,
});
type Props = {
  lessonData: lessons;
};
function Lesson({ lessonData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="flex flex-col gap-3 border border-black rounded-lg bg-blue-200 w-full  px-4 py-2 hover:bg-blue-300 hover:cursor-pointer"
    >
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 justify-between  items-center">
        <h4 className=" overflow-clip  text-lg uppercase">
          {lessonData.lessonTitle}
        </h4>
        <span className="text-lg hidden md:block">
          <Time time={lessonData.time} />
        </span>
        <Link
          className=" font-bold text-lg text-red-500 justify-self-center"
          target="_blank"
          href={lessonData.recording}
        >
          Recoding
        </Link>
        {isOpen ? (
          <ArrowDownIcon className="w-6 h-6 justify-self-end" />
        ) : (
          <ArrowUpIcon className="w-6 h-6 justify-self-end" />
        )}
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-2">
          <hr className="border-1 border-gray-600  flex-1  " />
          <div className="flex justify-between flex-1">
            <h5>Lesson Title</h5>
            <p>{lessonData.lessonTitle}</p>
          </div>
          <hr className="border-1 border-gray-600  flex-1  " />
          <div className="flex justify-between flex-1">
            <h5>Time</h5>
            <p>
              <Time time={lessonData.time} />
            </p>
          </div>{" "}
          <hr className="border-1 border-gray-600  flex-1  " />
          <div className="flex justify-between flex-1">
            <h5>Recording</h5>
            <Link
              className=" font-bold text-lg text-red-500"
              target="_blank"
              href={lessonData.recording}
            >
              Recoding
            </Link>
          </div>
          <hr className="border-1 border-gray-600  flex-1  " />
          <div className="flex justify-between flex-1">
            <h5>Notes</h5>
            <p>{lessonData.notes}</p>
          </div>
          <hr className="border-1 border-gray-600  flex-1  " />
          <div className="flex justify-between flex-1 gap-6">
            <h5>HomeWork</h5>
            <p>{lessonData.homework}</p>
          </div>
        </div>
      ) : null}
      {/* <p className=" text-center">{`${lessonData.lesson}, On the ${lessonData.date} , and notes ${lessonData.notes}, Link of Recoding ${lessonData.recoding} and your Home work is ${lessonData.homework} `}</p> */}
    </div>
  );
}
export default Lesson;
