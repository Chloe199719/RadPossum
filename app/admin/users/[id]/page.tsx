import prismaClient from "@/lib/prisma/prismaClient";
import React from "react";
import UserInfo from "./UserInfo";

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

async function Page({ params }: Props) {
  const user = await getUser(params.id);
  console.log(user);

  if (!user)
    return (
      <div>
        <h2 className="text-4xl">User not found</h2>
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-3xl text-center">User Page : {user.name}</h2>
      <div className="w-full space-y-6 border-2 border-black py-4 rounded-lg">
        <h3 className="text-center text-3xl">User Info</h3>
        <UserInfo user={user} />
      </div>
    </div>
  );
}

export default Page;
