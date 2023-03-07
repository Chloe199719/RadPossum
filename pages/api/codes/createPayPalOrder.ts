import type { NextApiRequest, NextApiResponse } from "next";
import paypal from "@paypal/checkout-server-sdk";
import fetchPaypal from "@/lib/paypal/fetchPaypalItems";
import checkTimeExist from "@/lib/bookinglesson/timeValidation";
import paypalClient from "@/lib/paypal/paypalClient";
import Hash from "@/lib/hashgenerator";
import cookie from "@/lib/cookie";

import { getCookie } from "cookies-next";
import fetchShopItem from "@/lib/codesProcesss/fetchPaypalItems";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  if (!req.body.amount || !req.body.id) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }

  try {
    const itemData = await fetchShopItem(req.body.id);
    const amount = req.body.amount * parseFloat(itemData?.paypal_price!);
    const request = new paypal.orders.OrdersCreateRequest();
    const hash = Hash();
    request.prefer("return=representation");
    request.requestBody({
      intent: `CAPTURE`,
      purchase_units: [
        {
          reference_id: req.body.id,
          invoice_id: hash,
          amount: {
            currency_code: process.env.CURRENCY!,

            value: amount.toString(),
            /* @ts-expect-error */
            breakdown: {
              item_total: {
                currency_code: process.env.CURRENCY!,

                value: amount.toString(),
              },
            },
          },
          items: [
            {
              category: `DIGITAL_GOODS`,
              name: itemData?.title!,
              unit_amount: {
                currency_code: process.env.CURRENCY!,

                value: itemData?.paypal_price!,
              },
              quantity: req.body.amount,
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
