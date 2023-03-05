import prismaClient from "../prisma/prismaClient";

export default async function checkCode(code: string) {
  try {
    const checkCode = await prismaClient.lessonCodes.findUnique({
      where: {
        code: code,
      },
    });

    if (!checkCode) {
      throw new Error(`Code Not valid`);
    }
    if (checkCode.used) {
      throw new Error(`Code Already Used`);
    }
    return Promise.resolve({
      id: checkCode.id,
      time: checkCode.time,
      locale: checkCode.public_or_private,
    });
  } catch (error: any) {
    return Promise.reject({ status: 400, message: error.message });
  }
}
