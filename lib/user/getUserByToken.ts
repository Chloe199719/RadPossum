import prismaClient from "../prisma/prismaClient";

const fetchUserID = async function (token: string) {
  try {
    const id = await prismaClient.session.findUnique({
      where: {
        sessionToken: token,
      },

      include: {
        user: true,
      },
    });
    if (!id) {
      return Promise.reject({ status: 500, message: `Server Error` });
    }
    return { userID: id.userId, email: id.user.email };
  } catch (error) {
    return Promise.reject({ status: 500, message: `Server Error` });
  }
};

export default fetchUserID;
