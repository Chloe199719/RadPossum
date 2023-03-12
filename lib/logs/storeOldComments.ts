import { comments } from "@prisma/client";
import prismaClient from "../prisma/prismaClient";

export default async function storeOldComments(postToStore: comments) {
  try {
    const data = await prismaClient.commentsOLD.create({
      data: {
        commentID: postToStore.id,
        postID: postToStore.postID,
        parentID: postToStore.parentID,
        message: postToStore.message,
        userID: postToStore.userID,
        updatedAT: postToStore.createdAT,
      },
    });
    return data;
  } catch (error) {
    return Promise.reject({ message: `Could not Store Old Comment` });
  }
}
