import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
type Props = {
  user: User;
};

function UserItem({ user }: Props) {
  return (
    <div className="grid grid-cols-4 items-center px-2 py-4 rounded-lg border border-gray-300">
      <Image
        width={80}
        height={80}
        src={`${user.image}`}
        alt="user Image"
      ></Image>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <Link className="w-full" href={`/admin/users/${user.id}`}>
        <button className="btn w-full">Show More</button>
      </Link>
    </div>
  );
}

export default UserItem;
