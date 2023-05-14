import type { NextApiRequest, NextApiResponse } from "next";
import paypal from "@paypal/checkout-server-sdk";
import fetchPaypal from "@/lib/paypal/fetchPaypalItems";
import checkTimeExist from "@/lib/bookinglesson/timeValidation";
import paypalClient from "@/lib/paypal/paypalClient";
import Hash from "@/lib/hashgenerator";
import cookie from "@/lib/cookie";

import { getCookie } from "cookies-next";
import fetchUserID from "@/lib/user/getUserByToken";
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

  if (!req.body.item || !req.body.time || !req.body.offset) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  const time = new Date(req.body.time);
  if (time.getUTCDay() === 0) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }

  try {
    const body = z
      .object({
        item: z.string(),
        time: z.number(),
        offset: z.number(),
      })
      .parse(req.body);

    const token = getCookie(cookie, { req, res });
    const userId = await fetchUserID(token as string);
    const itemData = await fetchPaypal(body.item);
    if (itemData === null) {
      throw new Error("Item not found");
    }
    const timeValid = await checkTimeExist(body.time.toString());
    const request = new paypal.orders.OrdersCreateRequest();
    const hash = Hash();
    request.prefer("return=representation");
    request.requestBody({
      intent: `CAPTURE`,
      purchase_units: [
        {
          reference_id: body.item,
          invoice_id: hash,
          amount: {
            currency_code: process.env.CURRENCY!,

            value:
              time.getUTCDay() === 6
                ? (
                    parseFloat(itemData.price_saturday) * userId.discount
                  ).toString()
                : (
                    parseFloat(itemData.price_standard) * userId.discount
                  ).toString(),
            /* @ts-expect-error */
            breakdown: {
              item_total: {
                currency_code: process.env.CURRENCY!,

                value:
                  time.getUTCDay() === 6
                    ? (
                        parseFloat(itemData.price_saturday) * userId.discount
                      ).toString()
                    : (
                        parseFloat(itemData.price_standard) * userId.discount
                      ).toString(),
              },
            },
          },
          items: [
            {
              category: `DIGITAL_GOODS`,

              name: itemData.title,
              unit_amount: {
                currency_code: process.env.CURRENCY!,
                value:
                  time.getUTCDay() === 6
                    ? (
                        parseFloat(itemData.price_saturday) * userId.discount
                      ).toString()
                    : (
                        parseFloat(itemData.price_standard) * userId.discount
                      ).toString(),
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
    // If no status or message are Present throw a Default Bad Request
    if (!error.status) {
      res.status(400).json({ message: ` Bad Request` });
      return;
    }
    res.status(error.status).json(error.message);
    return;
  }
}
