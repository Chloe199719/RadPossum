import prismaClient from "@/lib/prisma/prismaClient";
import React from "react";
import Items from "./items";

import dynamic from "next/dynamic";
const Create = dynamic(() => import("./Create"), {
  ssr: false,
});
type Props = {};

async function fetchHours() {
  try {
    const data = await prismaClient.avaiable_hours.findMany({
      orderBy: {
        hour: "asc",
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}

async function Page({}: Props) {
  const data = await fetchHours();
  if (!data) return <div>no data</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-3xl  text-center">Bookable Hours</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-lg">Time (UTC)</th>
              <th className="text-lg text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((hour, i) => (
              <Items key={hour.id} index={i} hour={hour} />
            ))}
          </tbody>
        </table>
      </div>
      <Create hours={data} />
    </div>
  );
}

export default Page;
