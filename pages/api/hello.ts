// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../lib/email/nodemailer";
/* @ts-expect-error */
import { RandomHash } from "random-hash";

import test from "@/lib/testLog";
import generateTime from "@/lib/bookinglesson/generatetime";
import axios from "axios";
import { headers } from "next/headers";
import { URLSearchParams } from "url";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const test = await axios.post(
    //   `https://discord.com/api/oauth2/token?${new URLSearchParams({
    //     client_id: process.env.DISCORD_CLIENT_ID!,
    //     client_secret: process.env.DISCORD_CLIENT_SECRET!,
    //     grant_type: "refresh_token",
    //     refresh_token: `R9NaB3WgKUOGMryfwTuw1WuKTqmvOh`,
    //   })} `,
    //   {},
    //   { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    // );
    // res.status(200).json({ test });
    // return;
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ name: `test` });
}
