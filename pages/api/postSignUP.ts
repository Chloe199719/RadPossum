import type { NextApiRequest, NextApiResponse } from "next";
import pb from "@/lib/pocketbase";
// type Data = {
//   name: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const request = await pb.collection(`users`).create({
        username: "test_username",
        email: "test@example.com",
        password: "12345678",
        passwordConfirm: "12345678",
        name: "test",
      });
      console.log(request);
      res.status(200).json(request);
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send(`Invalid METHOD`);
  }
}
