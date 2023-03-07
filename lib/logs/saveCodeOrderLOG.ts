import { LessonCodes } from "@prisma/client";
import prismaClient from "../prisma/prismaClient";

type aurg = {
  code: LessonCodes[];
  invoice_id: string;
  item_bought: string;
  value: string;
};

export default async function saveCodeOrderLog({
  code,
  invoice_id,
  item_bought,
  value,
}: aurg) {
  try {
    return await prismaClient.$transaction(
      code.map((code) => {
        const data = prismaClient.paypal_order_codes_logs.create({
          data: {
            invoice_id: invoice_id,
            shopID: item_bought,
            value: value,
            lessonCodeID: code.id,
          },
        });
        return data;
      })
    );
  } catch (error) {
    return error;
  }
}
