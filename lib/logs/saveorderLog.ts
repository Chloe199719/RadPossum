import pb from "../pocketbase";
import prismaClient from "../prisma/prismaClient";

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
    const log = await prismaClient.paypal_order_logs.create({
      data: {
        invoice_id: invoice_id,
        value: value,
        bookingId: booking as string,
        item_bought: item_bought,
      },
    });
    return log;
  } catch (error) {}
}
