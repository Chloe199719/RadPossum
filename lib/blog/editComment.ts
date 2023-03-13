import prismaClient from "../prisma/prismaClient";

export default async function editComment(commentID: string, message: string) {
  try {
    const data = await prismaClient.comments.update({
      where: {
        id: commentID,
      },
      data: {
        message: message,
        edited: true,
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}
