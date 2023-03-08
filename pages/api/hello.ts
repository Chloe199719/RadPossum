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
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  res.status(200).json({ name: "John Doe" });
}
