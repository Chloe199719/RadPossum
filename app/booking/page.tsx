"use client";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import pb from "@/lib/pocketbase";
import dynamic from "next/dynamic";
import Calendar from "react-calendar";

const CheckoutBtn = dynamic(() => import(`./CheckoutBtn`), { ssr: false });

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
type Props = {};
function Page({}: Props) {
  const hours = ["14:00", "15:00", "16:00", "17:00"];
  const [availableHours, setAvailableHours] = useState<string[]>();
  const [selectedHour, setSelectedHour] = useState(``);
  const [data, setDate] = useState(new Date());

  const Submit = async function () {
    await pb.collection("booking").create({
      date: `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`,
      hour: selectedHour,
    });
    console.log(`done`);
  };

  const fetch = async function () {
    setAvailableHours([]);
    setSelectedHour(``);
    try {
      const date = await pb.collection(`booking`).getList(1, 20, {
        filter: `date= "${data.getFullYear()}-${
          data.getMonth() + 1
        }-${data.getDate()}"`,
      });
      console.log(date);
      const hoursav = hours.filter((hour) => {
        return !date.items.some((e) => {
          return e.hour.includes(hour);
        });
      });
      setAvailableHours(hoursav);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="min-h-screen  flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
        <div className="flex gap-4 w-full ">
          <CheckoutBtn />
          <Calendar onChange={setDate} value={data} onClickDay={fetch} />
          <div className="flex flex-col">
            {availableHours?.map((e, i) => {
              return (
                <button
                  onClick={() => {
                    setSelectedHour(e);
                  }}
                  key={i}
                >
                  {e}
                </button>
              );
            })}
          </div>
          {selectedHour ? (
            <p>
              {`${data.getFullYear()}-${
                data.getMonth() + 1
              }-${data.getDate()} at ${selectedHour}`}{" "}
            </p>
          ) : null}
          <button onClick={Submit}>Test Book</button>
          <button onClick={fetch}>Test Fetch</button>
        </div>
      </div>
    </main>
  );
}
export default Page;
