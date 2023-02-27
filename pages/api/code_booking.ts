import bookingLesson from "@/lib/bookinglesson/bookinglesson";
import generateTime from "@/lib/bookinglesson/generatetime";
import checkCode from "@/lib/codesProcesss/checkcode";
import pb from "@/lib/pocketbase";
import type { NextApiRequest, NextApiResponse } from "next";

interface body {
  clientID: string;
  clientEmail: string;
  bookedHour: string;
  time: Date;
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
  try {
    const codeRes: codeRes = await checkCode(body.code);
    // Check if Time is not already assigned TODO
    bookingLesson({
      date: generateTime(body.time),
      hour: body.bookedHour,
      client: body.clientID,
      locale: codeRes.locale,
      bookedTime: codeRes.time,
      discordID: body.discordID,
      message: body.message,
      email: body.clientEmail,
    });
    console.log(codeRes);
  } catch (error: any) {
    console.log(error);
    if (!error.status) {
      res.status(400).json({ message: ` Bad Request` });
      return;
    }
    res.status(error.status).json(error.message);
    return;
  }

  //   try {
  //     const checkCode = await pb.collection("codes").getList(1, 50, {
  //       filter: `code = "${body.code}" && isValid = true`,
  //       APIKEY: "412312312",
  //     });

  //     if (checkCode.totalItems === 0) {
  //       throw new Error(`Code Not valid`);
  //     }
  //     if (checkCode.items[0]?.used) {
  //       throw new Error(`Code Already Used`);
  //     }
  //   } catch (error: any) {
  //     res.status(400).json(error.message);
  //     return;
  //   }

  //  try {
  //       await pb.collection(`booking`).create(
  //         {
  //           date: event.data.object.metadata.date,
  //           hour: event.data.object.metadata.hour,
  //           clientId: event.data.object.metadata.client,
  //         },
  //         { APIKEY: "412312312" } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
  //       );
  //       await pb.collection(`bookingUSER`).create(
  //         {
  //           date: event.data.object.metadata.date,
  //           hour: event.data.object.metadata.hour,
  //           user: event.data.object.metadata.client,
  //           public_or_private: event.data.object.metadata.locale,
  //           discordID: event.data.object.custom_fields[0].text.value,
  //           message: event.data.object.custom_fields[1].text.value,
  //           bookedtime: event.data.object.metadata.time,
  //           canceled: false,
  //           completed: false,
  //         },
  //         { APIKEY: "412312312" } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
  //       );
  //       await transporter.sendMail({
  //         from: process.env.SMTP_USER,
  //         to: event.data.object.customer_details.email,
  //         subject: "Test Message",
  //         text: `Your Lesson is Booked for ${event.data.object.metadata.date} at ${event.data.object.metadata.hour} `,
  //         html: `<p>Your Lesson is Booked for ${event.data.object.metadata.date} at ${event.data.object.metadata.hour}</p>`,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  console.log(body.code);
  res.status(200).json({ name: "John Doe" });
}
