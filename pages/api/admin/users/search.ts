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
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
    return;
  }

  // if (!req.query.searchTerm) {
  //   res.status(400).json({ message: `Bad Request` });
  //   return;
  // }

  try {
    const query = z
      .object({
        searchTerm: z.string().trim().min(1),
      })
      .parse(req.query);
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
              contains: query.searchTerm as string,
            },
          },
          {
            email: {
              contains: query.searchTerm as string,
            },
          },
          {
            discord: {
              contains: query.searchTerm as string,
            },
          },
        ],
      },
    });

    res.status(200).json(search);
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

    return;
  }
}
