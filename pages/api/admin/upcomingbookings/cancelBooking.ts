import cancelBooking from "@/lib/admin/cancelBooking";
import rebookCode from "@/lib/admin/RebookCode";
import cookie from "@/lib/cookie";
import emailRebookCodes from "@/lib/email/emailrebookCode";
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
  if (!req.body.id || !req.body.reason) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);

    if (!userId.isAdmin) {
      throw new Error("Not Admin");
    }
    const bookingUpdate = await cancelBooking(req.body.id);
    const code = await rebookCode({
      time: bookingUpdate.bookedTime,
      userID: bookingUpdate.userID,
      public_or_private: bookingUpdate.public_or_private,
    });
    const email = await emailRebookCodes({
      code: code.code,
      reason: req.body.reason,
      oldBooking: bookingUpdate,
    });
    res.status(200).json({ message: `Lesson Canceled` });
    return;
  } catch (error: any) {
    if (error.status === 401 || error.message === "Not Admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(500).json({ message: `Error Canceling the  Lesson` });
    return;
  }
}
