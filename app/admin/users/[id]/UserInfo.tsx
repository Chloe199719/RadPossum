import { UserALL } from "@/types";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  user: UserALL;
};

function UserInfo({ user }: Props) {
  return (
    <div className="grid grid-cols-4 place-items-center gap-4">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.discord}</div>
      <div className=" ">
        <Image src={user.image!} width={60} height={60} alt="User Info" />
      </div>
    </div>
  );
}

export default UserInfo;
