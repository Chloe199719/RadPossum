import type { NextApiRequest, NextApiResponse } from "next";
import paypal from "@paypal/checkout-server-sdk";
import fetchPaypal from "@/lib/paypal/fetchPaypalItems";
import checkTimeExist from "@/lib/bookinglesson/timeValidation";
import paypalClient from "@/lib/paypal/paypalClient";
import Hash from "@/lib/hashgenerator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }
  const time = new Date(req.body.date);
  if (time.getDay() === 0) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  console.log(time.getDay());
  try {
    const itemData = await fetchPaypal(req.body.item);
    const timeValid = await checkTimeExist(req.body.selHour, req.body.date);
    const request = new paypal.orders.OrdersCreateRequest();
    console.log(
      time.getDay() === 6 ? itemData.price_saturday : itemData.price_standard
    );
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
              time.getDay() === 6
                ? itemData.price_saturday
                : itemData.price_standard,
            /* @ts-expect-error */
            breakdown: {
              item_total: {
                currency_code: process.env.CURRENCY!,
                value:
                  time.getDay() === 6
                    ? itemData.price_saturday
                    : itemData.price_standard,
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
                  time.getDay() === 6
                    ? itemData.price_saturday
                    : itemData.price_standard,
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
  res.status(200).json({ name: "John Doe" });
}
