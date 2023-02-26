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
  // If Any Required Body value missing Throw an 400 Error
  if (!body.clientEmail || !body.time || !body.bookedHour || !body.productID) {
    res.status(400).json({ message: `Bad Request1` });
    return;
  }

  // If The Selected Time is a Sunday Throw an Error
  const time = new Date(body.time);
  if (time.getDay() === 0) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }

  try {
    // Check if time Exist in Database if return True throw an error
    if (await checkTimeExist(body.bookedHour, time)) {
      res.status(400).json({ message: `Bad Request 2` });
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
