import { emailCodes } from "@/types";
import { transporter } from "./nodemailer";

export default async function emailRebookCodes({
  code,
  reason,
  oldBooking,
}: emailCodes) {
  try {
    const email = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: oldBooking.email!,
      subject: `Your Booking at ${new Date(
        parseInt(oldBooking.time)
      ).toLocaleString()} has been cancelled`,
      text: `Your Booking at ${new Date(
        parseInt(oldBooking.time)
      ).toLocaleString()} has been cancelled \n Reason : ${reason} \n Here a Lesson Code That u can Use To Rebook Your Lesson sorry for the inconvenience \n Code : ${code} `,
      html: `<h1>Your Booking at ${new Date(
        parseInt(oldBooking.time)
      ).toLocaleString()} has been cancelled </h1>
        <p>Reason : ${reason}</p>
        <p>Here a Lesson Code That u can Use To Rebook Your Lesson sorry for the inconvenience </p>
        <p>Code : ${code}</p>
      `,
    });
    return email;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: `Error Creating Your Codes`,
    });
  }
}
