import prismaClient from "@/lib/prisma/prismaClient";
import React from "react";
import Table from "./Table";
import Link from "next/link";

type Props = {};

async function fetchShop() {
  try {
    const res = await prismaClient.shop.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return res;
  } catch (error) {
    return null;
  }
}

async function Page({}: Props) {
  const data = await fetchShop();
  if (!data) return <div>loading...</div>;
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-3xl text-center">Shop</h2>
      <Table shop={data} />
      <Link className="" href={`/admin/shop/create`}>
        <button className="btn w-full">Create New Item</button>
      </Link>
    </div>
  );
}

export default Page;
