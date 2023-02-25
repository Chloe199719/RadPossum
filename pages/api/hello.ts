// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "./nodemailer";
/* @ts-expect-error */
import { RandomHash } from "random-hash";
import fetchProdId from "@/lib/fetchProdID";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(await fetchProdId());
  res.status(200).json({ name: "John Doe" });
}
