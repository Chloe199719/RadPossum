import prismaClient from "../prisma/prismaClient";

const fetchUserID = async function (token: string) {
  try {
    const id = await prismaClient.session.findUnique({
      where: {
        sessionToken: token,
      },
      select: {
        userId: true,
      },
    });
    if (!id) {
      return Promise.reject({ status: 500, message: `Server Error` });
    }
    return id.userId;
  } catch (error) {
    return Promise.reject({ status: 500, message: `Server Error` });
  }
};

export default fetchUserID;
