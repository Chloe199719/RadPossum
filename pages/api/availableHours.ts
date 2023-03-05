import prismaClient from "@/lib/prisma/prismaClient";
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
  console.log(req.query);
  if (!req.query.date) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const data = await prismaClient.booking.findMany({
      where: {
        date: req.query.date as string,
      },
      select: {
        hour: true,
      },
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
    return;
  }
}
