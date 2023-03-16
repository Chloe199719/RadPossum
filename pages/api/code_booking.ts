import bookingLesson from "@/lib/bookinglesson/bookinglesson";
import generateTime from "@/lib/bookinglesson/generatetime";
import checkTimeExist from "@/lib/bookinglesson/timeValidation";
import checkCode from "@/lib/codesProcesss/checkcode";
import setCodeUsed from "@/lib/codesProcesss/setCodeUsed";
import cookie from "@/lib/cookie";
import fetchUserID from "@/lib/user/getUserByToken";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

interface body {
  clientID: string;
  clientEmail: string;
  bookedHour: string;
  time: string;
  discordID: string;
  message: string;
  code: string;
}
type codeRes = {
  id: string;
  time: string;
  locale: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  const body: body = JSON.parse(req.body);
  // Checks if all Required Information Got Passed in the Request
  if (!body.time || !body.code || !body.discordID) {
    res
      .status(400)
      .json({ message: `Bad Request a Required Parameter is missing` });
    return;
  }
  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);
    // Return a Resolved Promise if code is valid else throws a Rejected Promise
    const codeRes: codeRes = await checkCode(body.code);
    // Return a Resolved Promise if time doesn't exist yet else throws a Rejected Promise // Server Check if time Exists
    const checkTime = await checkTimeExist(body.time.toString());

    //Books Lesson
    await bookingLesson({
      time: body.time.toString(),

      client: userId.userID,
      locale: codeRes.locale,
      bookedTime: codeRes.time,
      discordID: body.discordID,
      message: body.message,
      email: userId.email!,
    });

    // Invalidates Code
    await setCodeUsed(codeRes.id);
  } catch (error: any) {
    console.log(error);
    // If no status or message are Present throw a Default Bad Request
    if (!error.status) {
      res.status(400).json({ message: ` Bad Request` });
      return;
    }
    res.status(error.status).json(error.message);
    return;
  }

  res.status(200).json({ message: `Your Lesson was Booked Successfully` });
}
