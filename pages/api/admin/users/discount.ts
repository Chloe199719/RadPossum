import cookie from "@/lib/cookie";
import prismaClient from "@/lib/prisma/prismaClient";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method Not Allowed");
    return;
  }

  if (!req.body.user || !req.body.discount) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }

  try {
    z.object({
      user: z.string(),
      discount: z.number().min(0).max(1),
    }).parse(req.body);
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);
    if (!userId.isAdmin) {
      throw new Error("Not Admin");
    }
    const updatedUser = await prismaClient.user.update({
      where: {
        id: req.body.user,
      },
      data: {
        discount: parseFloat(req.body.discount),
      },
    });
    res.status(200).json({ message: "Success" });
    return;
  } catch (error: any) {
    if (error.status === 401 || error.message === "Not Admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (error.name === "ZodError") {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: `Internal Server Error` });
    // console.log(error);
    return;
  }
}
