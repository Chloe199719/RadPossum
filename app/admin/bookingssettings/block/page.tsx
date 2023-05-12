import React, { Suspense } from "react";
import Calendar from "./Calendar";

type Props = {};

function Page({}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-3xl  text-center">Block a Time Slot</h2>
      <Suspense fallback={<div> Error</div>}>
        <Calendar />
      </Suspense>
    </div>
  );
}

export default Page;
