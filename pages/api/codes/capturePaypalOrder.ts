import { NextApiRequest, NextApiResponse } from "next";
import paypalClient from "@/lib/paypal/paypalClient";
import paypal from "@paypal/checkout-server-sdk";
import cookie from "@/lib/cookie";
import { getCookie } from "cookies-next";
import fetchUserID from "@/lib/user/getUserByToken";
import fetchShopItem from "@/lib/codesProcesss/fetchPaypalItems";
import createNewCode from "@/lib/codesProcesss/createNewCode";
import saveCodeOrderLog from "@/lib/logs/saveCodeOrderLOG";
import emailCodes from "@/lib/email/emailcodes";
import { z } from "zod";

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

  try {
    const body = z
      .object({
        orderID: z.string(),
      })
      .parse(req.body);
    const orderData = new paypal.orders.OrdersCaptureRequest(body.orderID);
    orderData.prefer("return=representation");
    const requestDetails = new paypal.orders.OrdersGetRequest(body.orderID);
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
      userId.userID
    );

    const emails = await emailCodes(codeGenerate, userId.email!);
    const returnData = await paypalClient.execute(orderData);
    const log = await saveCodeOrderLog({
      code: codeGenerate,
      invoice_id: returnData.result.purchase_units[0].invoice_id,
      item_bought: returnData.result.purchase_units[0].reference_id,
      value: returnData.result.purchase_units[0].amount.value,
    });
    res.status(200).json({ message: `Completed` });

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
