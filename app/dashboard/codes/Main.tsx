"use client";

import { useState } from "react";
import { Calendar } from "react-calendar";
import Form from "./Form";

type Props = {
  hours: Array<string>;
};
function Main({ hours }: Props) {
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

  const fetch1 = async function (e: Date) {
    setAvailableHours([]);
    setSelectedHour(``);
    try {
      const res = await fetch(
        `/api/availableHours/?date=${e.getFullYear()}-${
          e.getMonth() + 1
        }-${e.getDate()}`,
        {
          cache: "default",
          method: "GET",
        }
      );
      const date = await res.json();
      const hoursav = hours.filter((hour) => {
        return !date.some((e: any) => {
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
    <div className="flex gap-4 w-full flex-col items-center ">
      <div className="flex gap-4 w-full justify-center relative">
        {" "}
        <Calendar
          onChange={(e: Date) => {
            setDate(new Date(e.setHours(2)));
          }}
          value={data}
          minDetail="month"
          onClickDay={fetch1}
          minDate={minDaysDate()}
          maxDate={maxDaysDate()}
          tileDisabled={({ activeStartDate, date, view }) =>
            date.getDay() === 0
          }
        />
      </div>{" "}
      <p>All times are in UTC(Coordinated universal time)</p>
      <div className="flex gap-2 flex-wrap">
        {availableHours?.length !== 0 ? (
          availableHours?.map((e, i) => {
            return (
              <button
                className="px-6 py-2 bg-[#30bead]/30 hover:bg-[#30bead]/80 my-3 border border-black"
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
      <div>
        {" "}
        {selectedHour ? (
          <h3 className=" text-2xl md:text-4xl underline">
            You Selected:{" "}
            {`${data.getFullYear()}-${
              data.getMonth() + 1
            }-${data.getDate()} at ${selectedHour} UTC`}{" "}
          </h3>
        ) : null}
      </div>
      {selectedHour ? <Form date={data} selHour={selectedHour} /> : null}
    </div>
  );
}
export default Main;
