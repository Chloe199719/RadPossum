import fetchItem from "@/lib/fetchItem";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const time = new Date(body.time);
    try {
      const itemData = await fetchItem(body.productID, time.getDay());
      // Create Checkout Sessions from body params
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // TODO  Might Need to Add Prices  as ENV Variables for Reliability
            price: itemData.priceID,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {
          locale: itemData.locale,
          client: body.clientID,
          email: body.clientEmail,
          date: `${time.getFullYear()}-${
            time.getMonth() + 1
          }-${time.getDate()}`,
          hour: body.bookedHour,
        },
      });
      res.status(200).json({ url: session.url });
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
