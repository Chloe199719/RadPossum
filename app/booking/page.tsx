"use client";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
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

  const daysDate = function () {
    const curDate = new Date();
    curDate.setDate(curDate.getDate() + 3);
    return curDate;
  };
  const fetch = async function (e: Date) {
    setAvailableHours([]);
    setSelectedHour(``);
    try {
      const date = await pb.collection(`booking`).getList(1, 20, {
        filter: `date= "${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}"`,
      });
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
          <CheckoutBtn date={data} selHour={selectedHour} />
          <Calendar
            onChange={setDate}
            value={data}
            onClickDay={fetch}
            minDate={daysDate()}
            tileDisabled={({ activeStartDate, date, view }) =>
              date.getDay() === 0
            }
          />
          <div className="flex flex-col">
            {availableHours?.length !== 0 ? (
              availableHours?.map((e, i) => {
                return (
                  <button
                    className="px-2"
                    onClick={() => {
                      setSelectedHour(e);
                    }}
                    key={i}
                  >
                    {e}
                  </button>
                );
              })
            ) : (
              <p>No Available dates in this day</p>
            )}
          </div>
          {selectedHour ? (
            <p>
              {`${data.getFullYear()}-${
                data.getMonth() + 1
              }-${data.getDate()} at ${selectedHour}`}{" "}
              {data.getDay() === 6 ? (
                <span>70$ for this lesson</span>
              ) : (
                <span>50$ for this lesson</span>
              )}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
export default Page;
