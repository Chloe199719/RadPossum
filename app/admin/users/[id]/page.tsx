import prismaClient from "@/lib/prisma/prismaClient";
import React from "react";
import UserInfo from "./UserInfo";
import axios from "axios";
import Lessons from "./Lessons";
import LessonCodes from "./LessonCodes";
import Bookings from "./Bookings";
import DiscountForm from "./DiscountForm";

type Props = {
  params: {
    id: string;
  };
};
async function getUser(id: string) {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      include: {
        lessons: {
          orderBy: {
            time: "desc",
          },
        },
        LessonCodes: {
          orderBy: {
            timeCreated: "desc",
          },
        },
        booking: {
          orderBy: {
            time: "desc",
          },
        },
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
async function Account(id: string) {
  try {
    const discordInfo = await axios({
      url: `https://discord.com/api/users/${id}`,
      method: "GET",
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT}` },
    });
    return discordInfo.data;
  } catch (error) {
    return `not found`;
  }
}
async function Page({ params }: Props) {
  const user = await getUser(params.id);

  if (!user)
    return (
      <div>
        <h2 className="text-4xl">User not found</h2>
      </div>
    );
  const discordInfo = await Account(user.discord!);
  const codes = user.LessonCodes.map((code) => {
    return {
      id: code.id,
      code: code.code,
      used: code.used,
      public_or_private: code.public_or_private,
      time: code.time,
      isValid: code.isValid,
      timeCreated: code.timeCreated.getTime(),
      userID: code.userID,
    };
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-3xl text-center">User Page : {user.name}</h2>
      <div className="flex flex-col items-center gap-6  py-4 rounded-lg">
        <h3 className="text-center text-3xl">User Info</h3>
        <UserInfo
          user={user}
          discord={`${discordInfo.username}#${discordInfo.discriminator}`}
        />
        <hr className="w-full h-[2px] bg-gray-600 rounded-3xl" />
        <h3 className="text-center text-3xl">Lessons</h3>{" "}
        <Lessons lesson={user.lessons} />
        <hr className="w-full h-[2px] bg-gray-600 rounded-3xl" />
        <h3 className="text-center text-3xl">Codes</h3>{" "}
        <LessonCodes codes={codes} userID={user.id} />
        <hr className="w-full h-[2px] bg-gray-600 rounded-3xl" />
        <h3 className="text-center text-3xl">Bookings</h3>{" "}
        <Bookings bookings={user.booking} />
        <hr className="w-full h-[2px] bg-gray-600 rounded-3xl" />
        <h3 className="text-center text-3xl">Settings</h3>
        <DiscountForm user={user.id} discount={user.discount} />
      </div>
    </div>
  );
}

export default Page;
