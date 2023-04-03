import cookie from "@/lib/cookie";
import prismaClient from "@/lib/prisma/prismaClient";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    res.status(405).end("Method Not Allowed");
    return;
  }

  if (
    !req.body.higlightText ||
    !req.body.titleFirst ||
    !req.body.titleSec ||
    !req.body.mainText
  ) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);

    if (!userId.isAdmin) {
      throw new Error("Not Admin");
    }
    const update = await prismaClient.hero.update({
      where: {
        id: `6caba1c4-38a2-4478-81c0-f7d49265babf`,
      },
      data: {
        higlightText: req.body.higlightText,
        titleFirst: req.body.titleFirst,
        titleSec: req.body.titleSec,
        mainText: req.body.mainText,
      },
    });
    res.status(200).json({ message: "Success" });
    return;
  } catch (error: any) {
    if (error.status === 401 || error.message === "Not Admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(500).json({ message: `Error Updating Hero` });
    console.log(error);
    return;
  }
}
