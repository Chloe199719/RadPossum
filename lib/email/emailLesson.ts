import { EmailLesson } from "@/types";
import { transporter } from "./nodemailer";

export default async function emailLesson({
  email,
  time,
  title,
  recording,
  notes,
  homework,
}: EmailLesson) {
  try {
    const emails = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Lesson : ${title}`,
      text: `Lesson : ${title} \n Time : ${new Date(
        parseInt(time)
      ).toLocaleString()} \n Recording : ${recording} \n Notes : ${notes} \n Homework : ${homework} \n Good Luck in Your Practice `,
      html: `<h1>Lesson : ${title}</h1>
      <p>Time : ${new Date(parseInt(time)).toLocaleString()}</p>
      <h2><a href="${recording}">Recoding </a> </h2>
      <h2<Notes : </h2>
      <p>${notes}</p>
      <h2>Homework : </h2>
      <p>${homework}</p>
      
      <p>Good Luck in Your Practice</p> `,
    });
    return emails;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: `Error Creating Your Codes`,
    });
  }
}
