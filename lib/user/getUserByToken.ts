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
      return Promise.reject({ status: 401, message: `User doesn't Exit` });
    }
    return {
      userID: id.userId,
      email: id.user.email,
      discord: id.user.discord,
      isAdmin: id.user.isAdmin,
      discount: id.user.discount,
    };
  } catch (error) {
    return Promise.reject({ status: 401, message: `Server Error` });
  }
};

export default fetchUserID;
