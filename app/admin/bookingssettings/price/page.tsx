import prismaClient from "@/lib/prisma/prismaClient";
import React from "react";
import Items from "./items";

type Props = {};
async function fetchData() {
  try {
    const data = await prismaClient.paypal_items.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}

async function Page({}: Props) {
  const data = await fetchData();
  if (!data) return <div>no data</div>;
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <h2 className=" text-4xl">Prices And Services</h2>
      <Items items={data!} />
    </div>
  );
}

export default Page;
