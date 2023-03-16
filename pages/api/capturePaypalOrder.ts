import { NextApiRequest, NextApiResponse } from "next";
import paypalClient from "@/lib/paypal/paypalClient";
import paypal from "@paypal/checkout-server-sdk";
import fetchPaypal from "@/lib/paypal/fetchPaypalItems";
import checkTimeExist from "@/lib/bookinglesson/timeValidation";
import bookingLesson from "@/lib/bookinglesson/bookinglesson";
import generateTime from "@/lib/bookinglesson/generatetime";
import saveOrderLogPaypal from "@/lib/logs/saveorderLog";
import cookie from "@/lib/cookie";

import { getCookie } from "cookies-next";
import fetchUserID from "@/lib/user/getUserByToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  if (!req.body.orderID || !req.body.time || !req.body.discordID) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  const time = new Date(req.body.time);
  if (time.getUTCDay() === 0) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  const orderData = new paypal.orders.OrdersCaptureRequest(req.body.orderID);
  const requestDetails = new paypal.orders.OrdersGetRequest(req.body.orderID);
  orderData.prefer("return=representation");
  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);
    const orderDetails = await paypalClient.execute(requestDetails);
    const itemData = await fetchPaypal(
      orderDetails.result.purchase_units[0].reference_id
    );
    const timeValid = await checkTimeExist(req.body.time.toString());
    const lessonBook = await bookingLesson({
      time: req.body.time.toString(),
      client: userId.userID,
      locale: itemData?.privacy!,

      bookedTime: itemData?.duration!,
      discordID: req.body.discordID,
      message: req.body.message,
      email: userId.email!,
    });
    const returnData = await paypalClient.execute(orderData);
    const log = await saveOrderLogPaypal({
      invoice_id: returnData.result.purchase_units[0].invoice_id,
      item_bought: returnData.result.purchase_units[0].reference_id,
      booking: lessonBook?.id,
      value: returnData.result.purchase_units[0].amount.value,
    });
    res.status(200).json({ message: `Completed` });
    // Add Logging to Order to DB
    return;
  } catch (error: any) {
    console.log(error);
    // If no status or message are Present throw a Default Bad Request
    if (!error.status) {
      res.status(400).json({ message: ` Bad Request` });
      return;
    }
    res.status(error.status).json(error.message);
    return;
  }
}
