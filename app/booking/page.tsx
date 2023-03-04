import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import dynamic from "next/dynamic";
import prismaClient from "@/lib/prisma/prismaClient";

const Main = dynamic(() => import(`./Main`), { ssr: false });

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
type Props = {};

const fetchBtnData = async function () {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/shop_buttons/records/`,
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
const fetchPaypalPublic = async function () {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/paypal_public_id/records/?API_KEY=${process.env.API_KEY}`,
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
const fetchHours = async function () {
  try {
    // const res = await fetch(
    //   `${process.env.DB_URL}api/collections/available_Hours/records/?sort=+hour`,
    //   {
    //     method: `GET`,
    //     next: { revalidate: parseInt(process.env.REVALIDATE!) },
    //   }
    // );
    // if (!res.ok) {
    //   console.log(res);
    // }
    // const data = await res.json();
    const data = await prismaClient.avaiable_hours.findMany({
      orderBy: [{ hour: "asc" }],
    });
    return data;
  } catch (e) {
    console.log(e, "Error");
  }
};
async function Page({}: Props) {
  const btnData = await fetchBtnData();
  const paypalID = await fetchPaypalPublic();
  const hours = async function () {
    const data = await fetchHours();
    const array: Array<string> = [];
    data?.forEach((e: any) => {
      array.push(e.hour);
    });
    return array;
  };

  return (
    <main className="min-h-screen  flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
        <h2 className="text-2xl md:text-4xl">Booking Calendar</h2>
        <Main
          btnData={btnData.items}
          hours={await hours()}
          paypalID={paypalID.items}
        />
      </div>
    </main>
  );
}
export default Page;
export const revalidate = 60;
