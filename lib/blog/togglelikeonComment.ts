import prismaClient from "../prisma/prismaClient";

type toggleLike = {
  userID: string;
  commentID: string;
};
export default async function toggleLikeOnComment({
  userID,
  commentID,
}: toggleLike) {
  const data = { commentId: commentID, userId: userID };
  try {
    const like = await prismaClient.like.findUnique({
      where: { userId_commentId: data },
    });
    if (like == null) {
      return await prismaClient.like.create({ data });
    } else {
      return await prismaClient.like.delete({
        where: { userId_commentId: data },
      });
    }
  } catch (error) {}
}
