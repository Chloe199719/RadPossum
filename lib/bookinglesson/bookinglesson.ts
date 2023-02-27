import { transporter } from "@/lib/email/nodemailer";
import pb from "../pocketbase";

type info = {
  date: string;
  hour: string;
  client: string;
  locale: string; // public or  Private
  bookedTime: string;
  discordID: string;
  message: string;
  email: string;
};

export default async function bookingLesson({
  date,
  hour,
  client,
  locale,
  bookedTime,
  discordID,
  message,
  email,
}: info) {
  try {
    await pb.collection(`booking`).create(
      {
        date: date,
        hour: hour,
        clientId: client,
      },
      { APIKEY: "412312312" } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
    );
    await pb.collection(`bookingUSER`).create(
      {
        date: date,
        hour: hour,
        user: client,
        public_or_private: locale,
        discordID: discordID,
        message: message,
        bookedtime: bookedTime,
        canceled: false,
        completed: false,
      },
      { APIKEY: "412312312" } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
    );
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Test Message",
      text: `Your Lesson is Booked for ${date} at ${hour} `,
      html: `<p>Your Lesson is Booked for ${date} at ${hour}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
}
