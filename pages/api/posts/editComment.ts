import editComment from "@/lib/blog/editComment";
import cookie from "@/lib/cookie";
import storeOldComments from "@/lib/logs/storeOldComments";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import fetchCommentUser from "../../../lib/blog/fetchComment";
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
  if (!req.body.message || !req.body.commentID) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const body = z
      .object({
        message: z.string().min(1).max(200),
        commentID: z.string(),
      })
      .parse(req.body);
    const userId = await fetchUserID(token as string);
    const fetchComment = await fetchCommentUser(req.body.commentID);
    if (fetchComment?.userID !== userId.userID!) {
      res.status(401).json({ message: `Not Authorized` });
      return;
    }
    const storeOldCom = await storeOldComments(fetchComment);
    const returnData = await editComment(body.commentID, body.message);

    res.status(200).json({ success: "Comment Successfully Created" });
    return;
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: `Error Creating Your Post ` });
  }
}
