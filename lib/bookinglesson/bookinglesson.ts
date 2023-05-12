import { transporter } from "@/lib/email/nodemailer";
import prismaClient from "../prisma/prismaClient";

type info = {
  time: string;
  client: string;
  locale: "Public" | "Private"; // public or  Private
  bookedTime: string;
  discordID: string;
  message: string;
  email: string;
};

export default async function bookingLesson({
  time,
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
        time: time,
        userID: client,
        public_or_private: locale,
        discordID: discordID,
        message: message,
        bookedTime: bookedTime,
        email: email,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Test Message",
      text: `Your Lesson is Booked for ${new Date(parseInt(time))} `,
      html: `<p>Your Lesson is Booked for ${new Date(parseInt(time))}</p>`,
    });
    return lessonBook;
  } catch (error) {
    console.log(error);
  }
}
