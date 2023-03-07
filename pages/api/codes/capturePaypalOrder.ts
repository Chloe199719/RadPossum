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
import fetchShopItem from "@/lib/codesProcesss/fetchPaypalItems";
import createNewCode from "@/lib/codesProcesss/createNewCode";
import saveCodeOrderLog from "@/lib/logs/saveCodeOrderLOG";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  if (!req.body.orderID) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  const orderData = new paypal.orders.OrdersCaptureRequest(req.body.orderID);
  const requestDetails = new paypal.orders.OrdersGetRequest(req.body.orderID);
  orderData.prefer("return=representation");
  try {
    const token = getCookie(cookie, { req, res });
    if (!token) {
      res.status(401).json({ message: `Not Authorized` });
      return;
    }
    const userId = await fetchUserID(token as string);
    const orderDetails = await paypalClient.execute(requestDetails);
    const itemData = await fetchShopItem(
      orderDetails.result.purchase_units[0].reference_id
    );
    const codeGenerate = await createNewCode(
      itemData!,
      orderDetails.result.purchase_units[0].items[0].quantity,
      userId
    );
    const returnData = await paypalClient.execute(orderData);
    const log = await saveCodeOrderLog({
      code: codeGenerate,
      invoice_id: returnData.result.purchase_units[0].invoice_id,
      item_bought: returnData.result.purchase_units[0].reference_id,
      value: returnData.result.purchase_units[0].amount.value,
    });
    res.status(200).json({ message: `Completed` });
    // Add Logging to Order to DB
    return;
  } catch (error: any) {
    // If no status or message are Present throw a Default Bad Request
    if (!error.status) {
      res.status(400).json({ message: ` Bad Request` });
      return;
    }
    res.status(error.status).json(error.message);
    return;
  }
}
