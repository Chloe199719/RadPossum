import prismaClient from "../prisma/prismaClient";

export default async function setCodeUsed(id: string) {
  await prismaClient.lessonCodes.update({
    where: {
      id: id,
    },
    data: {
      used: true,
    },
  });
}
