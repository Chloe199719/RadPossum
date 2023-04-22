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
    <div className="flex justify-center items-center gap-2 bg-gradient-to-t from-[#30bead]/30 to-[#ff7e84]/40 px-6 py-10 rounded-lg">
      <div className="">
        <Image
          className="rounded-full"
          src={user.image!}
          width={100}
          height={100}
          alt="User Info"
        />
      </div>
      <div className="flex flex-col ">
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
