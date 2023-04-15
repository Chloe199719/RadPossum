import prismaClient from "@/lib/prisma/prismaClient";
import { error } from "console";
import React from "react";
import EditForm from "./EditForm";

type Props = {
  params: {
    id: string;
  };
};

async function fetchItem(id: string) {
  try {
    const data = await prismaClient.shop.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}

async function Page({ params }: Props) {
  const data = await fetchItem(params.id);

  if (!data) {
    return <h1>404 Item not Found</h1>;
  }
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h2 className="text-3xl">Editing: {data?.title}</h2>
      <EditForm item={data} />
    </div>
  );
}

export default Page;
