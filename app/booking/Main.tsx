"use client";
import { paypal_items } from "@prisma/client";
import { useSession } from "next-auth/react";

import { useRef, useState } from "react";

import PaypalBtn from "./PaypalBtn";
import CheckoutBtn from "./CheckoutBtn";
import dynamic from "next/dynamic";
// import { Calendar } from "react-calendar";
const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});
type Props = {
  // btnData: {
  //   id: string;
  //   productID: string;
  //   button_text: string;
  //   privacy: string;
  //   duration: string;
  // }[];
  paypalID: paypal_items[] | undefined;
};
function Main({ paypalID }: Props) {
  //   const hours = ["14:00", "15:00", "16:00", "17:00"];

  const [availableHours, setAvailableHours] = useState<number[]>();
  const [selectedHour, setSelectedHour] = useState<number>();
  const [selected, setSelected] = useState<number>();
  const [data, setDate] = useState(new Date());
  const { data: session, status } = useSession();
  const duration = useRef<HTMLSelectElement>(null);
  const privacy = useRef<HTMLSelectElement>(null);
  // Sets How many Days In Advance You can Book // Also Probably Change 3 for ENV Variable
  const minDaysDate = function () {
    const curDate = new Date();
    curDate.setDate(curDate.getDate() + 3);
    return curDate;
  };
  const time = selectedHour;
  // Sets How many Days In Advance You can Book // Also Probably Change 34 for ENV Variable
  const maxDaysDate = function () {
    const curDate = new Date();
    curDate.setDate(curDate.getDate() + 100);
    return curDate;
  };
  // const fetch1 = async function (e: Date) {
  //   setAvailableHours([]);
  //   setSelectedHour(``);
  //   try {
  //     const res = await fetch(
  //       `/api/availableHours/?date=${e.getFullYear()}-${
  //         e.getMonth() + 1
  //       }-${e.getDate()}`,
  //       {
  //         cache: "default",
  //         method: "GET",
  //       }
  //     );
  //     const date = await res.json();
  //     const hoursav = hours.filter((hour) => {
  //       return !date.some((e: any) => {
  //         return e.hour.includes(hour);
  //       });
  //     });
  //     setAvailableHours(hoursav);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
  if (status === "unauthenticated") {
    return <p>Login First </p>;
  }
  if (status === "loading") {
    return <p>Loading... </p>;
  }
  function Time(e: Date) {
    console.log(e.getTimezoneOffset());

    if (e.getTimezoneOffset() > 0) {
      console.log(e.getTimezoneOffset());
      return e.getTime() - e.getTimezoneOffset() * 60 * 1000;
    } else if (e.getTimezoneOffset() < 0) {
      return e.getTime() - e.getTimezoneOffset() * 60 * 1000;
    } else {
      return e.getTime();
    }
  }
  // console.log(data.toUTCString());

  return (
    <div className="flex gap-4 w-full flex-col items-center justify-center ">
      <div className="flex flex-col md:flex-row gap-4 w-full justify-center relative">
        {" "}
        <div>
          <Calendar
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
                return (
                  <button
                    className={`btn  px-7 text-base font-sans text-gray-900 hover:text-white ${
                      selected === i ? `bg-slate-400` : `bg-white`
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
        <div className="flex flex-col  gap-5">
          <h3>Select Duration and Privacy</h3>
          <select
            name="time"
            id="time"
            ref={duration}
            className="select focus:outline-none border-transparent focus:border-transparent focus:ring-0"
            // value={duration}
            // onChange={(e) => {
            //   setDuration(e.target.value);
            // }}
          >
            <option value="50min">50min</option>
            <option value="30min">30min</option>
          </select>
          <select
            name="time"
            className="select select-primary focus:outline-none select-bordered border-transparent focus:border-transparent focus:ring-0"
            id="time"
            // value={privacy}
            // onChange={(e) => {
            //   setPrivacy(e.target.value);
            // }}
            ref={privacy}
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>
      </div>{" "}
      <div>
        {" "}
        {selectedHour ? (
          <h3 className=" text-2xl md:text-4xl underline">
            You Selected:{new Date(selectedHour).toLocaleString()}
          </h3>
        ) : null}
      </div>
      <div className="flex gap-2 items-end">
        {/* <CheckoutBtn
            btnData={btnData}
            date={data}
            selHour={selectedHour}
            privacy={privacy}
            duration={duration}
          /> */}
        <PaypalBtn
          paypalID={paypalID}
          time={time as number}
          privacyCur={privacy}
          durationCur={duration}
        />
      </div>
    </div>
  );
}
export default Main;
