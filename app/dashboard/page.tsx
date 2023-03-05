import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import prismaClient from "@/lib/prisma/prismaClient";
import { lessons } from "@prisma/client";
type lessons1 = {
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
};
const Dashboard = dynamic(() => import(`./dashboard`), { ssr: false });
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
    take: 1,
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
