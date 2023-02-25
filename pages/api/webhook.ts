import type { NextApiRequest, NextApiResponse } from "next";

import { buffer } from "micro";
import pb from "@/lib/pocketbase";
import { transporter } from "@/pages/api/nodemailer";
import Hash from "@/lib/hashgenerator";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  let event;
  //   Check IF the it comes from a trusted Source
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  //   Sucesss Create a Lesson code on the DB

  if (event.type === "checkout.session.completed") {
    let itemID = "";
    const product = await stripe.checkout.sessions.listLineItems(
      `${event.data.object.id}`,
      { limit: 5 }
    );
    // BOOKING WITH PAYMENT
    // Replace those Products with Api Fetches
    if (
      product.data[0].price.product === `prod_NP6Pys7GgwTY4D` ||
      product.data[0].price.product === `prod_NPwfd6rUI4hvJb`
    ) {
      try {
        await pb.collection(`booking`).create(
          {
            date: event.data.object.metadata.date,
            hour: event.data.object.metadata.hour,
            clientId: event.data.object.metadata.client,
          },
          { APIKEY: "412312312" } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
        );
        await pb.collection(`bookingUSER`).create(
          {
            date: event.data.object.metadata.date,
            hour: event.data.object.metadata.hour,
            user: event.data.object.metadata.client,
            public_or_private: event.data.object.metadata.locale,
            canceled: false,
          },
          { APIKEY: "412312312" } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
        );
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: event.data.object.customer_details.email,
          subject: "Test Message",
          text: `Your Lesson is Booked for ${event.data.object.metadata.date} at ${event.data.object.metadata.hour} `,
          html: `<p>Your Lesson is Booked for ${event.data.object.metadata.date} at ${event.data.object.metadata.hour}</p>`,
        });
      } catch (error) {
        console.log(error);
      }
    }
    // Code Creation
    // Replace those Products with Api Fetches
    if (product.data[0].price.product === `prod_NPwfd6rUI4hvJb`) {
      const newHash = Hash();
      try {
        await pb.collection(`codes`).create(
          {
            code: newHash,
            transactionID: event.id,
            used: false,
            userID: event.data.object.metadata.client,
          },
          { APIKEY: "412312312" } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
        );

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: event.data.object.customer_details.email,
          subject: "Test Message",
          text: `Your code is ${newHash}`,
          html: `<p>Your code is ${newHash}</p>`,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  res.status(200).end();
}
