import prismaClient from "@/lib/prisma/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.discordID ||
    !req.body.message
  ) {
    res
      .status(400)
      .json({ message: `Bad Request , Please Fill all Required Fields` });
    return;
  }
  try {
    const data = await prismaClient.messages.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        discordID: req.body.discordID,
        pronouns: req.body.pronouns,
        message: req.body.message,
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
