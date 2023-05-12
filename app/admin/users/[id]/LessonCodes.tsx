"use client";
import { LessonCodesUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
const Time = dynamic(() => import("./GeTTime"), {
  ssr: false,
});
type Props = {
  codes: LessonCodesUser[];
  userID: string;
};
function LessonCodes({ codes, userID }: Props) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({
      route,
      currentValue,
      codeID,
    }: {
      route: string;
      currentValue: string | boolean;
      codeID: string;
    }) => {
      return await axios({
        url: `/api/admin/users/code/${route}/`,
        method: `PUT`,
        data: {
          value: currentValue,
          id: codeID,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Code Updated`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Error updating product`);
    },
  });
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col w-full gap-3 items-center">
      <div className="overflow-x-auto w-full">
        <table className="table table-compact w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Code</th>
              <th>Used</th>
              <th>IsValid</th>
              <th>Privacy</th>
              <th>Duration</th>
              <th className="text-center">CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code, index) => {
              if (index >= (page - 1) * 10 && index < page * 10) {
                return (
                  <tr key={code.id}>
                    <td>{code.code}</td>
                    <td
                      className={`cursor-pointer link-hover link ${
                        code.used ? " bg-red-400" : "bg-green-400"
                      } `}
                      onClick={() => {
                        mutation.mutate({
                          route: "used",
                          currentValue: code.used,
                          codeID: code.id,
                        });
                      }}
                    >
                      {code.used ? "Used" : "Not Used"}
                    </td>
                    <td
                      className={`cursor-pointer link-hover link ${
                        code.isValid ? " bg-green-400" : "bg-red-400"
                      }`}
                      onClick={() => {
                        mutation.mutate({
                          route: "valid",
                          currentValue: code.isValid,
                          codeID: code.id,
                        });
                      }}
                    >
                      {code.isValid ? "Valid" : "Not Valid"}
                    </td>
                    <td
                      className={`cursor-pointer link-hover link ${
                        code.public_or_private === "Public"
                          ? " bg-blue-400"
                          : "bg-yellow-400"
                      }`}
                      onClick={() => {
                        mutation.mutate({
                          route: "privacy",
                          currentValue: code.public_or_private,
                          codeID: code.id,
                        });
                      }}
                    >
                      {code.public_or_private}
                    </td>
                    <td
                      className={`cursor-pointer link-hover link ${
                        code.time === "50min" ? " bg-rose-400" : "bg-purple-400"
                      }`}
                      onClick={() => {
                        mutation.mutate({
                          route: "duration",
                          currentValue: code.time,
                          codeID: code.id,
                        });
                      }}
                    >
                      {code.time}
                    </td>
                    <Time time={code.timeCreated.toString()} />
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="btn-group ">
        <button
          onClick={() => {
            setPage(page === 1 ? page : page - 1);
          }}
          className="btn"
        >
          «
        </button>
        <button className="btn">Page {page}</button>
        <button
          onClick={() => {
            setPage(codes.length / 10 > page ? page + 1 : page);
          }}
          className="btn"
        >
          »
        </button>
      </div>
      <Link className="w-full" href={`/admin/users/${userID}/codes/gift/`}>
        <button className="btn w-full">Gift Code to User</button>
      </Link>
    </div>
  );
}

export default LessonCodes;
