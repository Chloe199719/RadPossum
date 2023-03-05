import prismaClient from "../prisma/prismaClient";
import generateTime from "./generatetime";

const checkTimeExist = async function (hour: string, time: Date) {
  const date = await prismaClient.booking.findMany({
    where: {
      date: generateTime(time),
    },
    select: {
      hour: true,
    },
  });

  const check = date.some((item: any) => {
    return item.hour.includes(hour);
  });
  if (!check) {
    return Promise.resolve(true);
  } else {
    return Promise.reject({
      status: 400,
      message: `Time Already Booked Try Again`,
    });
  }
};

export default checkTimeExist;
