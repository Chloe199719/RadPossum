import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  user: User;
};

function UserItem({ user }: Props) {
  return (
    <div className="grid grid-cols-3 items-center px-2 py-4 rounded-lg border border-gray-300">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <Link className="w-full" href={`/admin/users/${user.id}`}>
        <button className="btn w-full">Show More</button>
      </Link>
    </div>
  );
}

export default UserItem;
