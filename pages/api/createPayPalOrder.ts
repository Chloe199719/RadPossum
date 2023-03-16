import type { NextApiRequest, NextApiResponse } from "next";
import paypal from "@paypal/checkout-server-sdk";
import fetchPaypal from "@/lib/paypal/fetchPaypalItems";
import checkTimeExist from "@/lib/bookinglesson/timeValidation";
import paypalClient from "@/lib/paypal/paypalClient";
import Hash from "@/lib/hashgenerator";
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
  if (
    !req.body.item ||
    !req.body.time ||
    !req.body.discordID ||
    !req.body.offset
  ) {
    res.status(400).json({ message: `Bad Request1` });
    return;
  }
  const time = new Date(req.body.time);
  if (time.getUTCDay() === 0) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }

  try {
    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);
    const itemData = await fetchPaypal(req.body.item);
    const timeValid = await checkTimeExist(req.body.time.toString());
    const request = new paypal.orders.OrdersCreateRequest();
    const hash = Hash();
    request.prefer("return=representation");
    request.requestBody({
      intent: `CAPTURE`,
      purchase_units: [
        {
          reference_id: req.body.item,
          invoice_id: hash,
          amount: {
            currency_code: process.env.CURRENCY!,

            value:
              time.getUTCDay() === 6 /* @ts-expect-error */
                ? itemData.price_saturday /* @ts-expect-error */
                : itemData.price_standard,
            /* @ts-expect-error */
            breakdown: {
              item_total: {
                currency_code: process.env.CURRENCY!,

                value:
                  time.getUTCDay() === 6
                    ? /* @ts-expect-error */
                      itemData.price_saturday
                    : /* @ts-expect-error */
                      itemData.price_standard,
              },
            },
          },
          items: [
            {
              category: `DIGITAL_GOODS`,
              /* @ts-expect-error */
              name: itemData.title,
              unit_amount: {
                currency_code: process.env.CURRENCY!,
                value:
                  time.getUTCDay() === 6
                    ? /* @ts-expect-error */
                      itemData.price_saturday
                    : /* @ts-expect-error */
                      itemData.price_standard,
              },
              quantity: `1`,
            },
          ],
        },
      ],
    });
    const order = await paypalClient.execute(request);
    res.status(200).json({ id: order.result.id });
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
  // const body = JSON.parse(req.body);
}
