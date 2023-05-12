"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import UserItem from "../search/UserItem";

type Props = {
  users: User[];
  searchParams: {
    page: string | null;
  };
};
function UserList({ searchParams, users }: Props) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const router = useRouter();
  if (users.length === 0) {
    return (
      <div className="space-y-7">
        {" "}
        <h2 className="text-4xl text-center">No Users </h2>{" "}
        <div className="btn-group flex justify-center">
          <button
            onClick={() => {
              router.push(
                `/admin/users/list?page=${page === 1 ? page : page - 1}`
              );
            }}
            className="btn"
          >
            «
          </button>
          <button className="btn">Page {page}</button>
          <button
            className="btn"
            onClick={() => {
              router.push(`/admin/users/list?page=${page + 1}`);
            }}
          >
            »
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full space-y-6">
      {users.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
      <div className="btn-group flex justify-center">
        <button
          onClick={() => {
            router.push(
              `/admin/users/list?page=${page === 1 ? page : page - 1}`
            );
          }}
          className="btn"
        >
          «
        </button>
        <button className="btn">Page {page}</button>
        <button
          className="btn"
          onClick={() => {
            router.push(`/admin/users/list?page=${page + 1}`);
          }}
        >
          »
        </button>
      </div>
    </div>
  );
}
export default UserList;
