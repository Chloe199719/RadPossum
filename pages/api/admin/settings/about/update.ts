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

  if (!req.body.id0 || !req.body.id1 || !req.body.about0 || !req.body.about1) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);

    if (!userId.isAdmin) {
      throw new Error("Not Admin");
    }
    const update0 = await prismaClient.aboutme.update({
      where: { id: req.body.id0 as string },
      data: { desc: req.body.about0 as string },
    });
    const update1 = await prismaClient.aboutme.update({
      where: { id: req.body.id1 as string },
      data: { desc: req.body.about1 as string },
    });
    res.status(200).json({ message: "Success" });
    return;
  } catch (error: any) {
    if (error.status === 401 || error.message === "Not Admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(500).json({ message: `Error Updating About` });
    console.log(error);
    return;
  }
}
