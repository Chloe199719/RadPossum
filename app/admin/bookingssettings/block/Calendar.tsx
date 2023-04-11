"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const CalendarApp = dynamic(() => import("react-calendar"), {
  ssr: false,
});
type Props = {};

function Calendar({}: Props) {
  const [data, setDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState<number>();
  const [availableHours, setAvailableHours] = useState<number[]>();
  const [selected, setSelected] = useState<number>();
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
  const fetchHours = async function (e: Date) {
    setAvailableHours([]);
    setSelectedHour(0);
    try {
      const res = await fetch(
        `/api/availableHours2/?time=${e.getTime()}&offset=${e.getTimezoneOffset()}`,
        {
          cache: "default",
          method: "GET",
        }
      );
      const date: number[] = await res.json();

      setAvailableHours(date);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex ">
        <div>
          <CalendarApp
            onChange={(e: Date) => {
              // console.log(e.getTime() - e.getTimezoneOffset() * 60 * 1000)
              setDate(new Date(e));
            }}
            value={data}
            minDetail="month"
            onClickDay={(e: Date) => {
              fetchHours(e), setSelected(9999);
            }}
            minDate={minDaysDate()}
            maxDate={maxDaysDate()}
            // tileDisabled={({ activeStartDate, date, view }) =>
            //   date.getDay() === 0
            // }
          />
        </div>
        <div>
          {" "}
          <p>Times Displayed in Local Time</p>
          <div className="grid grid-rows-4 grid-flow-col gap-2 p-2 flex-1">
            {availableHours?.length !== 0 ? (
              availableHours?.map((e, i) => {
                console.log(selected === i);
                return (
                  <button
                    className={`btn bg-white px-7 text-base font-sans text-gray-900 hover:text-white ${
                      selected === i && `bg-slate-400`
                    }`}
                    onClick={() => {
                      setSelectedHour(e);
                      setSelected(i);
                    }}
                    key={i}
                  >
                    {new Date(e).toLocaleTimeString([], {
                      hour: `2-digit`,
                      minute: `2-digit`,
                    })}
                  </button>
                );
              })
            ) : (
              <p>No Available dates in this day</p>
            )}
          </div>
        </div>
      </div>
      <div>
        {" "}
        {selectedHour ? (
          <h3 className=" text-xl md:text-4xl underline">
            You Selected:{new Date(selectedHour).toLocaleString()}
          </h3>
        ) : null}
      </div>
      <button className="btn w-full">Block</button>
    </div>
  );
}

export default Calendar;
