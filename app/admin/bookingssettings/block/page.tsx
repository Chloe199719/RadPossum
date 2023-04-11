import React from "react";
import Calendar from "./Calendar";

type Props = {};

function Page({}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-3xl  text-center">Block a Time Slot</h2>
      <Calendar />
    </div>
  );
}

export default Page;
