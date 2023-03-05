import React from "react";
import dynamic from "next/dynamic";
import prismaClient from "@/lib/prisma/prismaClient";
import { lessons1 } from "@/types";
import { cookies } from "next/headers";

const Dashboard = dynamic(() => import(`./lessons`), { ssr: false });
const fetchLesson = async function (token: string | undefined) {
  const id = await prismaClient.session.findUnique({
    where: {
      sessionToken: token,
    },
    select: {
      userId: true,
    },
  });
  if (!id) {
    return null;
  }
  const lesson = await prismaClient.lessons.findMany({
    where: {
      userID: id.userId,
    },
    orderBy: [{ time: `desc` }],
    include: {
      exercises: true,
    },
  });
  return lesson;
};

type Props = {};
async function Page({}: Props) {
  const cookieStore = cookies();
  console.log(cookieStore.get(`next-auth.session-token`)?.value);
  const lessonData = async function () {
    if (cookieStore.get(`next-auth.session-token`)?.value) {
      const data = await fetchLesson(
        cookieStore.get(`next-auth.session-token`)?.value
      );

      const returnData: lessons1[] = [];
      data?.forEach((obj) => {
        returnData.push({
          id: obj.id,
          userID: obj.userID,
          lessonTitle: obj.lessonTitle,
          recording: obj.recording,
          notes: obj.notes,
          homework: obj.homework,
          time: obj.time?.toUTCString(),
          exercises: obj.exercises,
        });
      });
      return returnData;
    }
    return null;
  };

  return <Dashboard lesson={await lessonData()} />;
}
export default Page;
