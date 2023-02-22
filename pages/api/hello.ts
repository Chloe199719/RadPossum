// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "./nodemailer";
/* @ts-expect-error */
import { RandomHash } from "random-hash";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(process.env.SMTP_URL);
  const newHash = new RandomHash({
    length: 20,
    charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_",
    rng: randomBytes,
  });
  console.log(newHash());
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  res.status(200).json({ name: "John Doe" });
}
