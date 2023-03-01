"use client";

import pb from "@/lib/pocketbase";
import dynamic from "next/dist/shared/lib/dynamic";

import { useRef, useState } from "react";
import { Calendar } from "react-calendar";
import PaypalBtn from "./PaypalBtn";
const CheckoutBtn = dynamic(() => import(`./CheckoutBtn`), { ssr: false });

type Props = {
  btnData: {
    id: string;
    productID: string;
    button_text: string;
    privacy: string;
    duration: string;
  }[];
  paypalID: {
    id: string;
    private_id: string;
    title: string;
    privacy: string;
    duration: string;
  }[];
  hours: Array<string>;
};
function Main({ btnData, hours, paypalID }: Props) {
  //   const hours = ["14:00", "15:00", "16:00", "17:00"];
  const [availableHours, setAvailableHours] = useState<string[]>();
  const [selectedHour, setSelectedHour] = useState(``);
  const [data, setDate] = useState(new Date());
  // const [duration, setDuration] = useState(`50min`);
  // const [privacy, setPrivacy] = useState(`Private`);
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

  const userExist = pb.authStore.isValid;
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
        { cache: "default" }
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
  if (!userExist) {
    return <p>Login First </p>;
  }
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
        <select
          name="time"
          id="time"
          ref={duration}
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
            You Selected:{" "}
            {`${data.getFullYear()}-${
              data.getMonth() + 1
            }-${data.getDate()} at ${selectedHour} UTC`}{" "}
          </h3>
        ) : null}
      </div>
      {selectedHour ? (
        <div className="flex gap-2 items-end">
          <CheckoutBtn
            btnData={btnData}
            date={data}
            selHour={selectedHour}
            privacy={privacy}
            duration={duration}
          />
          <PaypalBtn
            paypalID={paypalID}
            date={data}
            selHour={selectedHour}
            privacyCur={privacy}
            durationCur={duration}
          />
        </div>
      ) : null}
    </div>
  );
}
export default Main;
