import prismaClient from "@/lib/prisma/prismaClient";

export default async function fetchCommentUser(commentID: string) {
  try {
    const data = await prismaClient.comments.findUnique({
      where: {
        id: commentID,
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}
