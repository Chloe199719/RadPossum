"use client";
import pb from "@/lib/pocketbase";
import { lessons } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import React from "react";
import Booking from "./Booking";
import Lesson from "./Lesson";
type Props = {
  lesson:
    | {
        id: string;
        userID: string;
        lessonTitle: string;
        recording: string;
        notes: string | null;
        homework: string | null;
        time: string | undefined;
        exercises: {
          id: string;
          name: string;
          desc: string;
        }[];
      }[]
    | null;
};
function Dashboard({ lesson }: Props) {
  const userInfo = pb.authStore.model;
  const router = useRouter();

  // const lessonQuery = useQuery({
  //   queryKey: [`lessons`],
  //   queryFn: () =>
  //     pb.collection(`lessons`).getList(1, 1, {
  //       sort: `-date`,
  //       $autoCancel: false,
  //     }),
  // });
  const BookingQuery = useQuery({
    queryKey: [`bookingUSER`],
    queryFn: () =>
      pb.collection(`bookingUSER`).getList(1, 20, {
        filter: `completed = false && canceled = false`,
        sort: `+date,hour`,
        $autoCancel: false,
      }),
  });

  const Test = function () {
    if (lesson === null || lesson.length === 0)
      return <p className=" text-center">No Lesson Taken yet </p>;

    return <Lesson lessonData={lesson[0]} />;
  };
  const UpcomingBooking = function () {
    if (BookingQuery.data === undefined)
      return <p className=" text-center">No Lesson Taken yet </p>;
    if (BookingQuery.data?.totalItems === 0)
      return <p className=" text-center">No Lesson Taken yet </p>;
    return (
      <div className="flex flex-col w-full gap-1">
        {BookingQuery.data?.items?.map((e) => {
          return <Booking key={e.id} bookingData={e} />;
        })}
      </div>
    );
  };
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10 w-full">
      <div className="  flex justify-center">
        <h2 className="text-5xl">Dashboard {userInfo?.name}</h2>
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
