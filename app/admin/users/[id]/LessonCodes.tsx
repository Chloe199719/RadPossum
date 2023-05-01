"use client";
import { LessonCodesUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "flowbite-react";
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
  // const router = useRouter();
  // const mutation = useMutation({
  //   mutationFn: async (userID: string) => {
  //     return await axios({
  //       url: `/api/admin/users/code/gift`,
  //       method: `POST`,
  //       data: {
  //         userID: userID,
  //       },
  //     });
  //   },
  //   onSuccess: () => {
  //     toast.success(`Code Created`);
  //     router.refresh();
  //   },
  //   onError: () => {
  //     toast.error(`Error updating product`);
  //   },
  // });
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
              <th>CreatedAt</th>
              <th className="text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code, index) => {
              if (index >= (page - 1) * 10 && index < page * 10) {
                return (
                  <tr key={code.id}>
                    <td>{code.code}</td>
                    <td>{code.used ? "Used" : "Not Used"}</td>
                    <td>{code.isValid ? "Valid" : "Not Valid"}</td>
                    <td>{code.public_or_private}</td>
                    <td>{code.time}</td>
                    <Time time={code.timeCreated.toString()} />

                    <td className="flex justify-center items-center">
                      !@32413123
                    </td>
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
