import React from "react";

import dynamic from "next/dynamic";

const Main = dynamic(() => import(`./Main`), { ssr: false });

type Props = {};

const fetchHours = async function () {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/available_Hours/records/?sort=+hour`,
      {
        method: `GET`,
        next: { revalidate: parseInt(process.env.REVALIDATE!) },
      }
    );
    if (!res.ok) {
      console.log(res);
    }
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e, "Error");
  }
};
async function Page({}: Props) {
  const hours = async function () {
    const data = await fetchHours();
    const array: Array<string> = [];
    data.items.forEach((e: any) => {
      array.push(e.hour);
    });
    return array;
  };

  return (
    <main className="flex flex-col items-center w-full gap-6">
      <h2 className="text-2xl md:text-4xl">Booking Calendar</h2>
      <Main hours={await hours()} />
    </main>
  );
}
export default Page;
