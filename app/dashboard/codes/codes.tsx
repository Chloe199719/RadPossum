import { LessonCodes } from "@prisma/client";
import React from "react";
import Lesson from "../Lesson";
import Code from "./code";

type Props = {
  codes:
    | {
        userID: string;
        id: string;
        code: string;
        used: boolean;
        isValid: boolean;
        time: string;
        public_or_private: string;
      }[]
    | null;
};
function Codes({ codes }: Props) {
  const ValidCodes = function () {
    if (codes === null || codes.length === 0)
      return <p className=" text-center">You have no Codes </p>;
    return (
      <>
        {codes.map((data) => {
          if (data.used || !data.isValid) {
            return;
          }
          return <Code key={data.id} code={data} />;
        })}
      </>
    );
  };
  const InvalidCodes = function () {
    if (codes === null || codes.length === 0)
      return <p className=" text-center">You have no Used Codes</p>;
    const UsedArray = codes.filter((e) => {
      if (!e.isValid || e.used) {
        return e;
      }
    });
    if (UsedArray === null || UsedArray.length === 0)
      return <p className=" text-center">You have no Used Codes </p>;
    return (
      <>
        {UsedArray?.map((data) => {
          if (!data?.used && data?.isValid) {
            return;
          }
          return <Code key={data?.id} code={data} />;
        })}
      </>
    );
  };
  return (
    <div className="flex flex-col justify-start md:items-center gap-6 flex-1 px-10 w-full">
      <div className="  flex justify-center">
        <h2 className="text-5xl">Codes</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full overflow-y-auto ">
        <h3 className=" text-3xl">Valid Codes</h3>

        <ValidCodes />

        <h3 className=" text-3xl">Used Codes?</h3>
        <InvalidCodes />
      </div>{" "}
    </div>
  );
}
export default Codes;
