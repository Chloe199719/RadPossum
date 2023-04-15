import cookie from "@/lib/cookie";
import prismaClient from "@/lib/prisma/prismaClient";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method Not Allowed");
    return;
  }

  if (
    !req.body.id ||
    !req.body.title ||
    !req.body.desc ||
    !req.body.paypal_price ||
    !req.body.image ||
    !req.body.duration ||
    !req.body.privacy
  ) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);

    if (!userId.isAdmin) {
      throw new Error("Not Admin");
    }
    const update = await prismaClient.shop.update({
      where: {
        id: req.body.id!,
      },
      data: {
        title: req.body.title!,
        desc: req.body.desc!,
        paypal_price: req.body.paypal_price!,
        image: req.body.image!,
        duration: req.body.duration!,
        privacy: req.body.privacy!,
      },
    });

    res.status(200).json({ message: "Success" });
    return;
  } catch (error: any) {
    if (error.status === 401 || error.message === "Not Admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(500).json({ message: `Error Updating Article` });
    console.log(error);
    return;
  }
}
