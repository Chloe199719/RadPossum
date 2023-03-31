import { EditPost } from "@/types";
import prismaClient from "../prisma/prismaClient";

export default async function editPost({ title, content, id }: EditPost) {
  try {
    const data = await prismaClient.posts.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        message: content,
      },
    });
    return data;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}
