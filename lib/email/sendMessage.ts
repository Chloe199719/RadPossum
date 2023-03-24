import { SendMessage } from "@/types";
import { transporter } from "@/lib/email/nodemailer";

export default async function sendMail({
  message,
  subject,
  email,
}: SendMessage) {
  try {
    const emailData = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
    });
    return emailData;
  } catch (error) {
    return Promise.reject(`Failure to Send Email`);
  }
}
