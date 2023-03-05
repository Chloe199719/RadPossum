import React from "react";
import dynamic from "next/dynamic";
import prismaClient from "@/lib/prisma/prismaClient";
import { lessons1 } from "@/types";
import { cookies } from "next/headers";
import cookie from "@/lib/cookie";
import Lessons from "./lessons";

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
  const lessonData = async function () {
    if (cookieStore.get(cookie)?.value) {
      const data = await fetchLesson(cookieStore.get(cookie)?.value);

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

  return <Lessons lesson={await lessonData()} />;
}
export default Page;
