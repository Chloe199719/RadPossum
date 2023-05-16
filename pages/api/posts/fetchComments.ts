import getComments from "@/lib/blog/fetchcomments";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
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
    const query = z
      .object({
        post: z.string(),
        sort: z.string().optional(),
      })
      .parse(req.query);
    const data = await getComments(query.post, query.sort);

    res.status(200).json({ data });
    return;
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
}
