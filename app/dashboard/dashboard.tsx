"use client";
import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import React from "react";
type Props = {};
function Dashboard({}: Props) {
  const userInfo = pb.authStore.model;
  const router = useRouter();

  const lessonQuerry = useQuery({
    queryKey: [`lessons`],
    queryFn: () =>
      pb.collection(`lessons`).getList(1, 1, {
        sort: `-date`,
        $autoCancel: false,
      }),
  });
  //   useEffect(() => {
  //     if (!userInfo) {
  //       router.push(`/`);
  //     }
  //   });
  console.log(lessonQuerry.data);
  return (
    <>
      <div className="col-span-2  flex justify-center">
        <h2 className="text-5xl">Dashboard {userInfo?.name}</h2>
      </div>
      <div className="row-span-2 col-span-2 flex flex-col justify-center gap-2">
        <h3>Your Last Lesson was</h3>
        <p>
          {lessonQuerry.data
            ? `${lessonQuerry.data?.items[0].lesson}, On the ${lessonQuerry.data?.items[0].date} , and notes ${lessonQuerry.data?.items[0].notes}, Link of Recoding ${lessonQuerry.data?.items[0].recoding} and your Home work is ${lessonQuerry.data?.items[0].homework} `
            : `No Lesson Taken yet`}
        </p>

        <h3>UpComing Bookings</h3>
      </div>{" "}
      {userInfo ? null : router.push(`/`)}
    </>
  );
}
export default Dashboard;
