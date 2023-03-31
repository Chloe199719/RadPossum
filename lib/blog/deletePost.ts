import prismaClient from "../prisma/prismaClient";

export default async function deletePost(id: string) {
  try {
    const deletePost = await prismaClient.posts.delete({
      where: {
        id: id,
      },
    });
    return deletePost;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}
