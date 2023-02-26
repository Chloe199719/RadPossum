"use client";
import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import React from "react";
import Booking from "../Booking";

type Props = {};
function Dashboard({}: Props) {
  const userInfo = pb.authStore.model;
  const router = useRouter();

  const BookingQuery = useQuery({
    queryKey: [`bookingUSERold`],
    queryFn: () =>
      pb.collection(`bookingUSER`).getList(1, 20, {
        filter: `completed = true && canceled = false`,
        sort: `+date,hour`,
        $autoCancel: false,
      }),
  });

  const BookingQueryUpcoming = useQuery({
    queryKey: [`bookingUSERUpcoming`],
    queryFn: () =>
      pb.collection(`bookingUSER`).getList(1, 20, {
        filter: `completed = false && canceled = false`,
        sort: `+date,hour`,
        $autoCancel: false,
      }),
  });

  const PastBookings = function () {
    if (BookingQuery.data === undefined)
      return <p className=" text-center">No Lesson Taken yet </p>;
    if (BookingQuery.data?.totalItems === 0)
      return <p className=" text-center">No Lesson Taken yet </p>;
    return (
      <>
        {BookingQuery.data.items.map((data) => {
          return <Booking key={data.id} bookingData={data} />;
        })}
      </>
    );
  };
  const UpcomingBookings = function () {
    if (BookingQueryUpcoming.data === undefined)
      return <p className=" text-center">No Lesson Taken yet </p>;
    if (BookingQueryUpcoming.data?.totalItems === 0)
      return <p className=" text-center">No Lesson Taken yet </p>;
    return (
      <>
        {BookingQueryUpcoming.data.items.map((data) => {
          return <Booking key={data.id} bookingData={data} />;
        })}
      </>
    );
  };
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10">
      <div className="  flex justify-center">
        <h2 className="text-5xl">{userInfo?.name} Bookings</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full overflow-y-auto ">
        <h3 className=" my-5 text-3xl">Upcoming Times</h3>
        <UpcomingBookings />
        <h3 className=" my-5 text-3xl">Past Bookings</h3>

        <PastBookings />
      </div>{" "}
      <p>For cancelation or rescheduling contact Jana on Discord </p>
    </div>
  );
}
export default Dashboard;
