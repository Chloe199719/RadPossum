import prismaClient from "@/lib/prisma/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
    return;
  }

  if (!req.query.time || !req.query.offset) {
    res.status(400).json({ message: `Bad Request` });
    return;
  }
  try {
    const dayInMilliseconds = 86400000;
    // const dbArrayWorkingTimes = [
    //   50400000, 54000000, 57600000, 61200000, 64800000,
    // ];
    const time: number = parseInt(req.query.time as string);
    const offset: number = parseInt(req.query.offset as string);
    const UTCTime = new Date(time).getTime() - offset * 60 * 1000;
    const dayBefore = UTCTime - dayInMilliseconds;
    const nextDay = UTCTime + dayInMilliseconds;
    const time23 = time + 82800000;
    const dbArrayWorkingTimes = await prismaClient.avaiable_hours.findMany({
      select: {
        hour: true,
      },
      orderBy: [{ hour: `asc` }],
    });
    const dayBeforeArray = dbArrayWorkingTimes.map((time) => {
      return dayBefore + time.hour;
    });
    const daySelectedArray = dbArrayWorkingTimes.map((time) => {
      return UTCTime + time.hour;
    });
    const dayAfterArray = dbArrayWorkingTimes.map((time) => {
      return nextDay + time.hour;
    });

    const possibleTimes = [
      ...dayBeforeArray,
      ...daySelectedArray,
      ...dayAfterArray,
    ];

    // console.log(
    //   possibleTimes.map((e) => {
    //     return new Date(e).toUTCString();
    //   })
    // );

    const data = await prismaClient.booking.findMany({
      where: {
        AND: [
          { time: { gte: possibleTimes[0].toString() } },
          { time: { lte: possibleTimes[possibleTimes.length - 1].toString() } },
        ],
      },
      select: {
        time: true,
      },
    });
    const avaiableTimes = possibleTimes.filter((e) => {
      return data.every((item: any) => {
        return parseInt(item.time) !== e;
      });
    });
    const filterSunday = avaiableTimes.filter((one) => {
      const time = new Date(one).getUTCDay();
      if (time !== 0) {
        return true;
      } else {
        return false;
      }
    });
    const clientTimes = filterSunday.filter((avTime) => {
      if (time <= avTime && time23 >= avTime) {
        return true;
      }
    });
    res.status(200).json(clientTimes);
    return;
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
    return;
  }
}
