import cookie from "@/lib/cookie";
import giftAdminCode from "@/lib/email/Admingiftcode";
import Hash from "@/lib/hashgenerator";
import prismaClient from "@/lib/prisma/prismaClient";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  if (!req.body.userID || !req.body.privacy || !req.body.duration) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }

  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);

    if (!userId.isAdmin) {
      throw new Error("Not Admin");
    }
    const hash: string = Hash();
    const createdCode = await prismaClient.lessonCodes.create({
      data: {
        code: hash,
        public_or_private: req.body.privacy,
        time: req.body.duration,
        userID: req.body.userID,
      },
      include: {
        user: true,
      },
    });
    const email = await giftAdminCode(hash, createdCode.user.email!);
    console.log(createdCode);
    res.status(200).json({ message: `Code Created` });
    return;
  } catch (error: any) {
    if (error.status === 401 || error.message === "Not Admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(500).json({ message: `Error Deleting Item` });
    console.log(error);
    return;
  }
}
