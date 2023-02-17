import React, { use, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
  lessonData: any;
};
function Lesson({ lessonData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="flex flex-col gap-3 border border-black rounded-lg bg-[#30bead]/30 w-full  px-4 py-2"
    >
      <div className="flex gap-3 justify-between ">
        <h4 className=" text-lg uppercase">{lessonData.lesson}</h4>
        <span className="text-lg">{lessonData.date}</span>
        <Link
          className=" font-bold text-lg text-red-500"
          target="_blank"
          href={lessonData.recoding}
        >
          Recoding
        </Link>
        {isOpen ? (
          <ArrowDownIcon className="w-6 h-6" />
        ) : (
          <ArrowUpIcon className="w-6 h-6" />
        )}
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-2">
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
