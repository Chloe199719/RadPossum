import deleteComment from "@/lib/blog/deleteComment";
import fetchCommentUser from "@/lib/blog/fetchComment";
import getComments from "@/lib/blog/fetchcomments";
import cookie from "@/lib/cookie";
import storeOldComments from "@/lib/logs/storeOldComments";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const token = getCookie(cookie, { req, res });
  if (!token) {
    res.status(401).json({ message: `Not Authorized` });
    return;
  }
  try {
    const query = z
      .object({
        commentID: z.string(),
      })
      .parse(req.query);
    const userId = await fetchUserID(token as string);
    const fetchComment = await fetchCommentUser(query.commentID as string);
    if (fetchComment?.userID !== userId.userID!) {
      res.status(401).json({ message: `Not Authorized` });
      return;
    }
    const storeOldCom = await storeOldComments(fetchComment);
    const data = await deleteComment(query.commentID as string);
    res.status(200).json({ message: `deleted` });
    return;
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
}
