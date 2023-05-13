"use client";
import React, { useState } from "react";

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
    const [page, setPage] = useState(1);
    if (codes === null || codes.length === 0)
      return <p className=" text-center">You have no Codes </p>;
    const codeArray = codes.filter((e) => {
      if (e.isValid || !e.used) {
        return e;
      }
    });
    return (
      <div className="overflow-x-auto w-full flex flex-col gap-2 items-center">
        <table className="table  w-full">
          <thead>
            <tr>
              <th>Privacy</th>
              <th>Duration</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {codeArray.map((data, index) => {
              if (data.used || !data.isValid) {
                return;
              }
              if (index >= (page - 1) * 10 && index < page * 10) {
                return <Code key={data.id} code={data} />;
              } else return null;
            })}
          </tbody>
        </table>
        <div className="btn-group ">
          <button
            onClick={() => {
              setPage(page === 1 ? page : page - 1);
            }}
            className="btn"
          >
            «
          </button>
          <button className="btn">Page {page}</button>
          <button
            onClick={() => {
              setPage(codes.length / 10 > page ? page + 1 : page);
            }}
            className="btn"
          >
            »
          </button>
        </div>
      </div>
    );
  };
  const InvalidCodes = function () {
    const [page, setPage] = useState(1);
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
      <div className="overflow-x-auto w-full flex flex-col gap-2 items-center">
        <table className="table  w-full">
          <thead>
            <tr>
              <th>Privacy</th>
              <th>Duration</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {UsedArray?.map((data, index) => {
              if (!data?.used && data?.isValid) {
                return;
              }
              if (index >= (page - 1) * 10 && index < page * 10) {
                return <Code key={data.id} code={data} />;
              } else return null;
            })}
          </tbody>
        </table>
        <div className="btn-group ">
          <button
            onClick={() => {
              setPage(page === 1 ? page : page - 1);
            }}
            className="btn"
          >
            «
          </button>
          <button className="btn">Page {page}</button>
          <button
            onClick={() => {
              setPage(UsedArray.length / 10 > page ? page + 1 : page);
            }}
            className="btn"
          >
            »
          </button>
        </div>
      </div>
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
