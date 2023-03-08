import { LessonCodes } from "@prisma/client";
import { transporter } from "./nodemailer";

export default async function emailCodes(codes: LessonCodes[], email: string) {
  const passArray: string[] = [];
  codes.forEach((code) => {
    passArray.push(code.code);
  });
  try {
    const test = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Test Message",
      text: `Your Codes Are ${passArray.join(` `)} `,
      html: `<h1>Your Codes are : </h1>
      ${passArray
        .map((code) => {
          return `<p>${code}<p>`;
        })
        .join(` `)}`,
    });
    return test;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: `Error Creating Your Codes`,
    });
  }
}
