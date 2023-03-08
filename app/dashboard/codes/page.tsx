import React from "react";

import prismaClient from "@/lib/prisma/prismaClient";

import { cookies } from "next/headers";
import cookie from "@/lib/cookie";
import Codes from "./codes";

const fetchCodes = async function (token: string | undefined) {
  const id = await prismaClient.session.findUnique({
    where: {
      sessionToken: token,
    },
    select: {
      userId: true,
    },
  });
  if (!id) {
    return null;
  }
  const codes = await prismaClient.lessonCodes.findMany({
    where: {
      userID: id.userId,
    },
    select: {
      id: true,
      code: true,
      used: true,
      isValid: true,
      time: true,
      userID: true,
      public_or_private: true,
    },
  });
  return codes;
};

type Props = {};
async function Page({}: Props) {
  const cookieStore = cookies();
  const codesData = async function () {
    if (cookieStore.get(cookie)?.value) {
      const data = await fetchCodes(cookieStore.get(cookie)?.value);

      return data;
    }
    return null;
  };

  return <Codes codes={await codesData()} />;
}
export default Page;
