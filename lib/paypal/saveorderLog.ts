import pb from "../pocketbase";

interface data {
  invoice_id: string;
  value: string;
  booking: string | undefined;
  item_bought: string;
}

export default async function saveOrderLogPaypal({
  invoice_id,
  value,
  booking,
  item_bought,
}: data) {
  try {
    const log = await pb.collection(`paypal_order_logs`).create(
      {
        invoice_id,
        value,
        booking,
        item_bought,
      },
      { API_KEY: process.env.API_KEY }
    );
    return log;
  } catch (error) {}
}
