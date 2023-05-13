import React from "react";
import { cookies } from "next/headers";
import prismaClient from "@/lib/prisma/prismaClient";

import cookie from "@/lib/cookie";
import Dashboard from "./dashboard";
import axios from "axios";
import { DiscordData } from "@/types";
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
const fetchBookings = async function (token: string | undefined) {
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
  const booking = await prismaClient.booking.findMany({
    where: {
      userID: id.userId,
    },
    orderBy: [{ time: "asc" }],
  });

  return booking;
};

type Props = {};
async function Page({}: Props) {
  const cookieStore = cookies();
  const lessonData = async function () {
    if (cookieStore.get(cookie)?.value) {
      const data = await fetchLesson(cookieStore.get(cookie)?.value);

      // const returnData: lessons1[] = [];
      // data?.forEach((obj) => {
      //   returnData.push({
      //     id: obj.id,
      //     userID: obj.userID,
      //     lessonTitle: obj.lessonTitle,
      //     recording: obj.recording,
      //     notes: obj.notes,
      //     homework: obj.homework,
      //     time: obj.time?.toUTCString(),
      //     exercises: obj.exercises,
      //   });
      // });
      return data;
    }
    return null;
  };
  const lessonBookingData = async function () {
    if (cookieStore.get(cookie)?.value) {
      const data = await fetchBookings(cookieStore.get(cookie)?.value);
      return data;
    }
    return null;
  };
  const bookings = await lessonBookingData();
  let procesedBookings = null;
  if (bookings) {
    procesedBookings = Promise.all(
      bookings.map(async (booking) => {
        try {
          const discordInfo = await axios({
            url: `https://discord.com/api/users/${booking.discordID}`,
            method: "GET",
            headers: { Authorization: `Bot ${process.env.DISCORD_BOT}` },
          });
          return {
            ...booking,
            discordID: `${discordInfo.data.username}# ${discordInfo.data.discriminator}`,
          };
        } catch (error) {
          return { ...booking };
        }
      })
    );
  }
  const data = await procesedBookings;
  return <Dashboard lesson={await lessonData()} bookings={data!} />;
}
export default Page;
