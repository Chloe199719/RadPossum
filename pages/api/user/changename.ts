import cookie from "@/lib/cookie";
import prismaClient from "@/lib/prisma/prismaClient";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method Not Allowed");
    return;
  }
  if (!req.body.name) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  const token = getCookie(cookie, { req, res });
  const userId = await fetchUserID(token as string);
  try {
    const data = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        name: req.body.name,
      },
    });
    res.status(200).json({ message: `User name Update` });
    return;
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
    return;
  }
}
