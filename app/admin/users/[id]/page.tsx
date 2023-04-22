import prismaClient from "@/lib/prisma/prismaClient";
import React from "react";
import UserInfo from "./UserInfo";
import axios from "axios";

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
        comments: true,
        lessons: true,
        LessonCodes: true,
        booking: true,
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
  console.log(discordInfo);

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-3xl text-center">User Page : {user.name}</h2>
      <div className="w-full space-y-6  py-4 rounded-lg">
        <h3 className="text-center text-3xl">User Info</h3>
        <UserInfo
          user={user}
          discord={`${discordInfo.username}#${discordInfo.discriminator}`}
        />
      </div>
    </div>
  );
}

export default Page;
