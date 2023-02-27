// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../lib/email/nodemailer";
/* @ts-expect-error */
import { RandomHash } from "random-hash";
import fetchProdId from "@/lib/fetchProdID";
import test from "@/lib/testLog";
import generateTime from "@/lib/bookinglesson/generatetime";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(generateTime(new Date()));
  res.status(200).json({ name: "John Doe" });
}
