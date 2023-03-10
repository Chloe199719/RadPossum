import prismaClient from "../prisma/prismaClient";

export default async function postComment(
  postID: string,
  userID: string,
  message: string,
  parentID: string | null
) {
  try {
    const data = await prismaClient.comments.create({
      data: {
        postID: postID,
        message: message,
        userID: userID,
        parentID: parentID,
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}
