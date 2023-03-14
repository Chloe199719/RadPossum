import prismaClient from "../prisma/prismaClient";

export default async function getComments(
  postID: string,
  sort: string = `desc`
) {
  try {
    const data = await prismaClient.comments.findMany({
      where: {
        postID: postID,
      },
      select: {
        id: true,
        parentID: true,
        message: true,
        createdAT: true,
        updatedAT: true,
        userID: true,
        postID: true,
        edited: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        Like: true,
      },
      orderBy: {
        createdAT: `${sort === `desc` ? `desc` : `asc`}`,
      },
    });
    return data;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
}
