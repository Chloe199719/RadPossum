import prismaClient from "@/lib/prisma/prismaClient";
import React from "react";
import Table from "./Table";

type Props = {};

async function fetchShop() {
  try {
    const res = await prismaClient.shop.findMany({});
    return res;
  } catch (error) {
    return null;
  }
}

async function Page({}: Props) {
  const data = await fetchShop();
  if (!data) return <div>loading...</div>;
  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl text-center">Shop</h2>
      <Table shop={data} />
    </div>
  );
}

export default Page;
