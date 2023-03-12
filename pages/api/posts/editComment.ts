import editComment from "@/lib/blog/editComment";
import cookie from "@/lib/cookie";
import storeOldComments from "@/lib/logs/storeOldComments";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import fetchCommentUser from "../../../lib/blog/fetchComment";
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
    const userId = await fetchUserID(token as string);
    const fetchComment = await fetchCommentUser(req.body.commentID);
    if (fetchComment?.userID !== userId.userID!) {
      res.status(401).json({ message: `Not Authorized` });
      return;
    }
    const storeOldCom = await storeOldComments(fetchComment);
    const returnData = await editComment(req.body.commentID, req.body.message);
    console.log(returnData);
    res.status(200).json({ success: "Comment Successfully Created" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Error Creating Your Post ` });
  }
}
