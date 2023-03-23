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
    return {
      userID: id.userId,
      email: id.user.email,
      discord: id.user.discord,
      isAdmin: id.user.isAdmin,
    };
  } catch (error) {
    return Promise.reject({ status: 500, message: `Server Error` });
  }
};

export default fetchUserID;
