"use client";
import React, { useState } from "react";
import { BsFillEraserFill, BsPencilFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {};

function Actions({}: Props) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="flex gap-2 w-full justify-center items-center">
      {" "}
      <BsPencilFill className="h-6 w-6 hover:text-slate-600 active:text-blue-600" />
      {!confirm ? (
        <BsFillEraserFill
          onClick={() => {
            setConfirm(true);
          }}
          className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800"
        />
      ) : (
        <>
          <button className="disabled:bg-slate-500">
            <GiConfirmed className="h-6 w-6 text-green-500 hover:text-green-400 active:text-green-800" />
          </button>

          <HiBan
            onClick={() => {
              setConfirm(false);
            }}
            className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800"
          />
        </>
      )}
    </div>
  );
}

export default Actions;
