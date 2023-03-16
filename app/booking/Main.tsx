"use client";
import { paypal_items } from "@prisma/client";
import { useSession } from "next-auth/react";

import { useRef, useState } from "react";
// import { Calendar } from "react-calendar";
import PaypalBtn from "./PaypalBtn";
import CheckoutBtn from "./CheckoutBtn";
import dynamic from "next/dynamic";

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

  const fetchtest = async function (e: Date) {
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
    <div className="flex gap-4 w-full flex-col items-center ">
      <div className="flex gap-4 w-full justify-center relative">
        {" "}
        <Calendar
          onChange={(e: Date) => {
            // console.log(e.getTime() - e.getTimezoneOffset() * 60 * 1000);
            console.log(e.getTime(), e.getTimezoneOffset());
            setDate(new Date(e));
          }}
          value={data}
          minDetail="month"
          onClickDay={fetchtest}
          minDate={minDaysDate()}
          maxDate={maxDaysDate()}
          // tileDisabled={({ activeStartDate, date, view }) =>
          //   date.getDay() === 0
          // }
        />
      </div>{" "}
      <p>Times Displayed in Local Time</p>
      <div className="flex gap-2 flex-wrap">
        {availableHours?.length !== 0 ? (
          availableHours?.map((e, i) => {
            return (
              <button
                className="btn btn-primary px-7 text-base text-white"
                onClick={() => {
                  setSelectedHour(e);
                }}
                key={i}
              >
                {new Date(e).toLocaleTimeString()}
              </button>
            );
          })
        ) : (
          <p>No Available dates in this day</p>
        )}
      </div>
      <div>
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
      <div>
        {" "}
        {selectedHour ? (
          <h3 className=" text-2xl md:text-4xl underline">
            You Selected:{new Date(selectedHour).toLocaleString()}
          </h3>
        ) : null}
      </div>
      {selectedHour ? (
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
            time={selectedHour}
            privacyCur={privacy}
            durationCur={duration}
          />
        </div>
      ) : null}
    </div>
  );
}
export default Main;
