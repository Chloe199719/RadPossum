import React from "react";
import Main from "./Main";

type Props = {};

async function Page({}: Props) {
  return (
    <main className="flex flex-col items-center w-full gap-6">
      <h2 className="text-2xl md:text-4xl">Booking Calendar</h2>
      <Main />
    </main>
  );
}
export default Page;
