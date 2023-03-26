import createLessonData from "@/lib/admin/createLesson";
import completeBooking from "@/lib/admin/setBookingCompleted";
import cookie from "@/lib/cookie";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
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
    !req.body.id ||
    !req.body.user ||
    !req.body.title ||
    !req.body.time ||
    !req.body.recording ||
    !req.body.notes ||
    !req.body.homework
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
    const lesson = await createLessonData({
      time: req.body.time,
      title: req.body.title,
      recording: req.body.recording,
      notes: req.body.notes,
      homework: req.body.homework,
      user: req.body.user,
    });
    const bookingUpdate = completeBooking(req.body.id);

    res.status(200).json({ message: `Lesson Created` });
    return;
  } catch (error: any) {
    if (error.status === 401 || error.message === "Not Admin") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(500).json({ message: `Error Creating Lesson` });
    return;
  }
}
