"use client";
import React, { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

type Props = {
  code: {
    userID: string;
    id: string;
    code: string;
    used: boolean;
    isValid: boolean;
    time: string;
    public_or_private: string;
  };
};
function Code({ code }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 border border-black rounded-lg bg-blue-200 w-full  px-4 py-2 hover:bg-blue-300 hover:cursor-pointer">
      <div
        className="flex gap-3 justify-between  "
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <h4 className=" text-lg uppercase">{code.public_or_private}</h4>
        <span className="text-lg">{code.time}</span>

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
            <h5>Code</h5>
            <p
              className={`${
                code.isValid && !code.used ? " text-green-600" : " text-red-700"
              } font-bold `}
            >
              {code.code}
            </p>
          </div>
          <hr className="border-1 border-gray-600  flex-1  " />
          <div className="flex justify-between flex-1">
            <h5>Validity</h5>
            <p
              className={`${
                code.isValid && !code.used ? " text-green-600" : " text-red-700"
              } font-bold`}
            >
              {code.isValid && !code.used ? "Code is Valid" : "Code was USED"}
            </p>
          </div>
        </div>
      ) : null}
      {/* <p className=" text-center">{`${lessonData.lesson}, On the ${lessonData.date} , and notes ${lessonData.notes}, Link of Recoding ${lessonData.recoding} and your Home work is ${lessonData.homework} `}</p> */}
    </div>
  );
}
export default Code;
