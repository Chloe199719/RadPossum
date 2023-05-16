import prismaClient from "@/lib/prisma/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  try {
    const body = z
      .object({
        name: z.string().min(1).max(20),
        email: z.string().email(),
        discordID: z.string().min(1).max(20),
        pronouns: z.string(),
        message: z.string().min(1).max(200),
        subject: z.string().min(1).max(20),
      })
      .parse(req.body);
    const data = await prismaClient.messages.create({
      data: {
        name: body.name,
        email: body.email,
        discordID: body.discordID,
        pronouns: body.pronouns,
        message: body.message,
        Subject: body.subject,
      },
    });
    res
      .status(200)
      .json({ message: `Message Sent Expect a message in next 24Hours` });
    return;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Error Sending your message pls try again` });
    return;
  }
}
