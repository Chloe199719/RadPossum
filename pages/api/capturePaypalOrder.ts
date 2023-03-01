import { NextApiRequest, NextApiResponse } from "next";
import paypalClient from "@/lib/paypal/paypalClient";
import paypal from "@paypal/checkout-server-sdk";
import fetchPaypal from "@/lib/paypal/fetchPaypalItems";
import checkTimeExist from "@/lib/bookinglesson/timeValidation";
import bookingLesson from "@/lib/bookinglesson/bookinglesson";
import generateTime from "@/lib/bookinglesson/generatetime";
import saveOrderLogPaypal from "@/lib/paypal/saveorderLog";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.orderID);
  const orderData = new paypal.orders.OrdersCaptureRequest(req.body.orderID);
  const requestDetails = new paypal.orders.OrdersGetRequest(req.body.orderID);
  orderData.prefer("return=representation");
  try {
    const orderDetails = await paypalClient.execute(requestDetails);
    const itemData = await fetchPaypal(
      orderDetails.result.purchase_units[0].reference_id
    );
    const timeValid = await checkTimeExist(req.body.selHour, req.body.date);
    const lessonBook = await bookingLesson({
      date: generateTime(req.body.date),
      hour: req.body.selHour,
      client: req.body.client,
      locale: itemData.privacy,
      bookedTime: itemData.duration,
      discordID: req.body.discordID,
      message: req.body.message,
      email: orderDetails.result.purchase_units[0].payee.email_address,
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
