import { UserALL } from "@/types";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  user: UserALL;
  discord: string;
};

function UserInfo({ user, discord }: Props) {
  return (
    <div className="flex justify-center item gap-2">
      <div className="">
        <Image
          className="rounded-full"
          src={user.image!}
          width={100}
          height={100}
          alt="User Info"
        />
      </div>
      <div className="flex flex-col">
        <div>
          {user.name}{" "}
          <span className=" text-sm text-gray-500">{user.discord}</span>
        </div>
        <div>{user.email}</div>
        <div>{discord}</div>
      </div>
    </div>
  );
}

export default UserInfo;
