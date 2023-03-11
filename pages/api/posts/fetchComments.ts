import getComments from "@/lib/blog/fetchcomments";
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
  if (!req.query.post) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const data = await getComments(req.query.post as string);

    res.status(200).json({ data });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
