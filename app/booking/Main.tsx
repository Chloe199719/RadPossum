"use client";

import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dist/shared/lib/dynamic";
import { ListResult } from "pocketbase";
import { useState } from "react";
import { Calendar } from "react-calendar";
const CheckoutBtn = dynamic(() => import(`./CheckoutBtn`), { ssr: false });

type Props = {
  btnData: {
    id: string;
    productID: string;
    button_text: string;
  }[];
  hours: Array<string>;
};
function Main({ btnData, hours }: Props) {
  //   const hours = ["14:00", "15:00", "16:00", "17:00"];
  const [availableHours, setAvailableHours] = useState<string[]>();
  const [selectedHour, setSelectedHour] = useState(``);
  const [data, setDate] = useState(new Date());

  // Sets How many Days In Advance You can Book // Also Probably Change 3 for ENV Variable
  const minDaysDate = function () {
    const curDate = new Date();
    curDate.setDate(curDate.getDate() + 3);
    return curDate;
  };
  // Sets How many Days In Advance You can Book // Also Probably Change 34 for ENV Variable
  const maxDaysDate = function () {
    const curDate = new Date();
    curDate.setDate(curDate.getDate() + 100);
    return curDate;
  };

  //   const fetch = async function (e: Date) {
  //     setAvailableHours([]);
  //     setSelectedHour(``);
  //     try {
  //       const date = await pb.collection(`booking`).getList(1, 20, {
  //         filter: `date= "${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}"`,
  //       });
  //       const hoursav = hours.filter((hour) => {
  //         return !date.items.some((e) => {
  //           return e.hour.includes(hour);
  //         });
  //       });
  //       setAvailableHours(hoursav);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const fetch1 = async function (e: Date) {
    setAvailableHours([]);
    setSelectedHour(``);
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_DB_URL
        }api/collections/booking/records/?filter=(date= "${e.getFullYear()}-${
          e.getMonth() + 1
        }-${e.getDate()}")`,
        { cache: "force-cache" }
      );
      const date = await res.json();
      const hoursav = hours.filter((hour) => {
        return !date.items.some((e: any) => {
          return e.hour.includes(hour);
        });
      });
      setAvailableHours(hoursav);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-4 w-full ">
      <Calendar
        onChange={setDate}
        value={data}
        onClickDay={fetch1}
        minDate={minDaysDate()}
        maxDate={maxDaysDate()}
        tileDisabled={({ activeStartDate, date, view }) => date.getDay() === 0}
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
      <div>
        {btnData.map((e) => {
          return (
            <CheckoutBtn
              key={e.id}
              productID={e.productID}
              button_text={e.button_text}
              date={data}
              selHour={selectedHour}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Main;
