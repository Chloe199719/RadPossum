import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import pb from "@/lib/pocketbase";
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const endpointSecret = process.env.STRIPE_WEBHOOK;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = req.body;
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  console.log(buf);
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === "checkout.session.completed") {
    try {
      await pb.collection(`codes`).create({
        code: event.id,
        used: false,
        userID: event.data.object.metadata.client,
      });
    } catch (error) {}
  }
  res.status(200).end();
}
