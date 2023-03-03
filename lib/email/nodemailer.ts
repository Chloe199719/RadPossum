import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_URL,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PW,
  },
});
