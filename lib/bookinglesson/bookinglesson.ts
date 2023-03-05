import { transporter } from "@/lib/email/nodemailer";
import pb from "../pocketbase";
import prismaClient from "../prisma/prismaClient";

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
    const lessonBook = await prismaClient.booking.create({
      data: {
        date: date,
        hour: hour,
        userID: client,
        public_or_private: locale,
        discordID: discordID,
        message: message,
        bookedTime: bookedTime,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Test Message",
      text: `Your Lesson is Booked for ${date} at ${hour} `,
      html: `<p>Your Lesson is Booked for ${date} at ${hour}</p>`,
    });
    return lessonBook;
  } catch (error) {
    console.log(error);
  }
}
