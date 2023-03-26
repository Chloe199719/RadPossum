"use client";

import { booking, lessons } from "@prisma/client";
import { useRouter } from "next/navigation";

import React from "react";
import Booking from "./Booking";
import Lesson from "./Lesson";
type Props = {
  lesson: lessons[] | null;
  bookings: booking[] | null;
};
function Dashboard({ lesson, bookings }: Props) {
  const router = useRouter();

  const Test = function () {
    if (lesson === null || lesson.length === 0)
      return <p className=" text-center">No Lesson Taken yet </p>;

    return <Lesson lessonData={lesson[0]} />;
  };
  const UpcomingBooking = function () {
    if (bookings === null || bookings.length === 0)
      return <p className=" text-center">No Lesson Taken yet </p>;

    return (
      <div className="flex flex-col w-full gap-1">
        {bookings.map((e) => {
          return <Booking key={e.id} bookingData={e} />;
        })}
      </div>
    );
  };
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10 w-full">
      <div className="  flex justify-center">
        <h2 className="text-5xl">Dashboard </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <h3 className=" text-3xl">Your Last Lesson was:</h3>
        <Test />
        <h3 className=" text-3xl">UpComing Bookings:</h3>
        <UpcomingBooking />
      </div>{" "}
    </div>
  );
}
export default Dashboard;
