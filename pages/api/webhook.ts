import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import pb from "@/lib/pocketbase";
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
    try {
      await pb.collection(`codes`).create(
        {
          code: event.id,
          used: false,
          userID: event.data.object.metadata.client,
        },
        { APIKEY: "412312312" } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
      );
    } catch (error) {
      console.log(error);
    }
  }
  res.status(200).end();
}
