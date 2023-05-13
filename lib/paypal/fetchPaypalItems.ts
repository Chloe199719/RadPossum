import prismaClient from "../prisma/prismaClient";

const fetchPaypal = async function (id: string) {
  try {
    const data = prismaClient.paypal_items.findUnique({
      where: {
        id: id,
      },
    });
    if (data === null) {
      return Promise.reject({
        status: 500,
        message: `There was Error in our Server`,
      });
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: `There was Error in our Server`,
    });
  }
};

export default fetchPaypal;
