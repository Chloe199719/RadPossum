import { CreatePost } from "@/types";
import prismaClient from "../prisma/prismaClient";

export default async function createPost({
  title,
  content,
  userID,
}: CreatePost) {
  try {
    const data = await prismaClient.posts.create({
      data: {
        title: title,
        message: content,
        userID: userID,
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}
