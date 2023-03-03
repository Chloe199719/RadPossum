"use client";
import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import React from "react";
import Lesson from "../Lesson";
type Props = {};
function Dashboard({}: Props) {
  const userInfo = pb.authStore.model;
  const router = useRouter();

  const lessonQuery = useQuery({
    queryKey: [`lessons`],
    queryFn: () =>
      pb.collection(`lessons`).getList(1, 250, {
        sort: `-date`,
        $autoCancel: false,
      }),
  });

  const Test = function () {
    if (lessonQuery.data === undefined)
      return <p className=" text-center">No Lesson Taken yet </p>;
    if (lessonQuery.data?.totalItems === 0)
      return <p className=" text-center">No Lesson Taken yet </p>;
    return (
      <>
        {lessonQuery.data.items.map((data) => {
          return <Lesson key={data.id} lessonData={data} />;
        })}
      </>
    );
  };
  return (
    <div className="flex flex-col justify-start md:items-center gap-6 flex-1 px-10">
      <div className="  flex justify-center">
        <h2 className="text-5xl">{userInfo?.name} Lessons</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full overflow-y-auto ">
        <h3 className=" text-3xl">Lessons History</h3>

        <Test />

        {/* <h3>UpComing Bookings</h3> */}
      </div>{" "}
      {/* {userInfo ? null : router.push(`/`)} */}
    </div>
  );
}
export default Dashboard;
