import createPost from "@/lib/blog/createPost";
import editPost from "@/lib/blog/editPost";
import cookie from "@/lib/cookie";
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
  if (!req.body.content || !req.body.title || !req.body.postID) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);

    if (!userId.isAdmin) {
      throw new Error("Not Admin");
    }
    const editedPost = await editPost({
      title: req.body.title,
      content: req.body.content,
      id: req.body.postID,
    });
    res.status(200).json({ editedPost });
    return;
  } catch (error: any) {
    if (error.status === 401 || error.message === "Not Admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(500).json({ message: `Error Creating Post` });
    return;
  }
}
