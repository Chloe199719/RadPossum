// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "./nodemailer";
/* @ts-expect-error */
import { RandomHash } from "random-hash";
import fetchProdId from "@/lib/fetchProdID";
import test from "@/lib/testLog";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  test();
  res.status(200).json({ name: "John Doe" });
}
