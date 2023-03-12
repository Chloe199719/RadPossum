import prismaClient from "../prisma/prismaClient";

export default async function deleteComment(id: string) {
  try {
    const deleteComment = await prismaClient.comments.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {}
}
