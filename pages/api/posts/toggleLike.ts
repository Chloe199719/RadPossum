import toggleLikeOnComment from "@/lib/blog/togglelikeonComment";
import cookie from "@/lib/cookie";

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

  const token = getCookie(cookie, { req, res });
  if (!token) {
    res.status(401).json({ message: `Not Authorized` });
    return;
  }
  try {
    const body = z
      .object({
        commentID: z.string(),
      })
      .parse(req.body);
    const userId = await fetchUserID(token as string);
    const data = await toggleLikeOnComment({
      userID: userId.userID,
      commentID: body.commentID,
    });

    res.status(200).json({ success: "Comment Successfully Created" });
    return;
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: `Error Updating Like Status ` });
  }
}
