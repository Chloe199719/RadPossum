import { NextApiRequest } from "next";
import stripe from "./stripe";

interface itemData {
  priceID: string;
  locale: string;
  time: string;
}

const generateTime = function () {
  const cur = new Date().getTime();
  const divided = Math.round(cur / 1000);
  const min5 = divided + 30 * 60;
  return min5;
};

const generateSession = async function (
  itemData: itemData,
  req: NextApiRequest,
  body: any,
  time: Date,
  temptime: string
) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // TODO  Might Need to Add Prices  as ENV Variables for Reliability
        price: itemData.priceID,
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: "DiscordID",
        label: { type: "custom", custom: "Discord ID" },
        type: "text",
      },
      {
        key: "message",
        label: { type: "custom", custom: "Message to Teacher" },
        type: "text",
        optional: true,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/canceled?session_id={CHECKOUT_SESSION_ID}&temp_time=${temptime}`,
    metadata: {
      locale: itemData.locale,
      client: body.clientID,
      email: body.clientEmail,
      date: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`,
      hour: body.bookedHour,
      time: itemData.time,
    },
    expires_at: generateTime(),
  });
  return session;
};

export default generateSession;
