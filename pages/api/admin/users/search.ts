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

  if (!req.query.searchTerm) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  console.log(req.query.searchTerm);

  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);

    if (!userId.isAdmin) {
      throw new Error("Not Admin");
    }
    const search = await prismaClient.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: req.query.searchTerm as string,
            },
          },
          {
            email: {
              contains: req.query.searchTerm as string,
            },
          },
          {
            discord: {
              contains: req.query.searchTerm as string,
            },
          },
        ],
      },
    });
    console.log(search);
    res.status(200).json(search);
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
