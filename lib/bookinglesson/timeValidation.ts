import prismaClient from "../prisma/prismaClient";
import generateTime from "./generatetime";

const checkTimeExist = async function (time: string) {
  const date = await prismaClient.booking.findMany({
    where: {
      time: time,
    },
    select: {
      time: true,
    },
  });

  // const check = date.some((item: any) => {
  //   return item.hour.includes(hour);
  // });

  if (date.length === 0) {
    return Promise.resolve(true);
  } else {
    return Promise.reject({
      status: 400,
      message: `Time Already Booked Try Again`,
    });
  }
};

export default checkTimeExist;
