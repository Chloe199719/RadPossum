import { shop } from "@prisma/client";
import Hash from "../hashgenerator";
import prismaClient from "../prisma/prismaClient";

export default async function createNewCode(
  itemData: shop,
  amount: string,
  userId: string
) {
  const passArray = [];
  try {
    for (let i = 0; i < parseInt(amount); i++) {
      const hash: string = Hash();
      const data = await prismaClient.lessonCodes.create({
        data: {
          code: hash,
          public_or_private: itemData.privacy,
          time: itemData.duration,
          userID: userId,
        },
      });
      passArray.push(data);
    }

    return passArray;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: `Error Creating Your Codes`,
    });
  }
}
