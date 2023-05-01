import { transporter } from "./nodemailer";

export default async function giftAdminCode(codes: string, email: string) {
  try {
    const test = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Test Message",
      text: `You got Gifted a Code ${codes} `,
      html: `<h1>You Got Gifted a Lesson Code </h1>
      <p>${codes}<p>
      `,
    });
    return test;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: `Error Creating Your Codes`,
    });
  }
}
