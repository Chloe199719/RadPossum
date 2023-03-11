import cookie from "@/lib/cookie";
import prismaClient from "@/lib/prisma/prismaClient";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
    return;
  }
  const token = getCookie(cookie, { req, res });
  if (!token) {
    res.status(401).end();
    return;
  }

  try {
    const userId = await fetchUserID(token as string);
    res.status(200).json({ userId });
    return;
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
    return;
  }
}
