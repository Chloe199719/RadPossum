import checkTimeExist from "@/lib/checkTimeExist";
import generateSession from "@/lib/createStripeSession";
import deleteTempTime from "@/lib/deleteTempTime";
import fetchItem from "@/lib/fetchItem";
import createTempDate from "@/lib/generateTempTime";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  const body = JSON.parse(req.body);
  const time = new Date(body.time);
  if (time.getDay() === 0) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    if (await checkTimeExist(body.bookedHour, time)) {
      res.status(400).json({ message: `Bad Request` });
      return;
    }
    const itemData = await fetchItem(body.productID, time.getDay());
    // Create a Temp Time
    const temptime = await createTempDate(time, body);

    // Create Checkout Sessions from body params
    const session = await generateSession(itemData, req, body, time);

    // Delete Temp Time and Invalidate session
    deleteTempTime(temptime.id, session.id);
    res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
}
