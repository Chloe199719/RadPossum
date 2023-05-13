import cookie from "@/lib/cookie";
import prismaClient from "@/lib/prisma/prismaClient";
import Booking from "../Booking";
import { cookies } from "next/headers";
import axios from "axios";

const fetchBookings = async function (token: string | undefined) {
  const id = await prismaClient.session.findUnique({
    where: {
      sessionToken: token,
    },
    select: {
      userId: true,
    },
  });
  if (!id) {
    return null;
  }
  const bookingUpcoming = await prismaClient.booking.findMany({
    where: {
      userID: id.userId,
      completed: {
        equals: false,
      },
      canceled: {
        equals: false,
      },
    },
    orderBy: [{ time: `asc` }],
  });
  const bookingPast = await prismaClient.booking.findMany({
    where: {
      userID: id.userId,
      completed: {
        equals: true,
      },
      canceled: {
        equals: false,
      },
    },
    orderBy: [{ time: `asc` }],
  });
  const processedUpComing = Promise.all(
    bookingUpcoming.map(async (data) => {
      try {
        const discordInfo = await axios({
          url: `https://discord.com/api/users/${data?.discordID}`,
          method: "GET",
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT}`,
          },
        });

        return {
          ...data,
          discordID: `${discordInfo.data.username}# ${discordInfo.data.discriminator}`,
        };
      } catch (error) {
        return { ...data };
      }
    })
  );
  const processedPast = Promise.all(
    bookingPast.map(async (data) => {
      try {
        const discordInfo = await axios({
          url: `https://discord.com/api/users/${data?.discordID}`,
          method: "GET",
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT}`,
          },
        });

        return {
          ...data,
          discordID: `${discordInfo.data.username}# ${discordInfo.data.discriminator}`,
        };
      } catch (error) {
        return { ...data };
      }
    })
  );
  const data1 = (await processedUpComing) ? await processedUpComing : null;
  const data2 = (await processedPast) ? await processedPast : null;
  return { bookingUpcoming: data1, bookingPast: data2 };
};

type Props = {};
async function Bookings({}: Props) {
  const lessonBookingData = async function () {
    const cookieStore = cookies();
    if (cookieStore.get(cookie)?.value) {
      const data = await fetchBookings(cookieStore.get(cookie)?.value);
      return data;
    }
    return null;
  };

  const data = await lessonBookingData();

  const PastBookings = function () {
    if (data?.bookingPast === null || data?.bookingPast.length === 0)
      return <p className=" text-center">You have no Bookings </p>;
    return (
      <>
        {data?.bookingPast.map((data) => {
          return <Booking key={data.id} bookingData={data} />;
        })}
      </>
    );
  };
  const UpcomingBookings = function () {
    if (data?.bookingUpcoming === null || data?.bookingUpcoming.length === 0)
      return <p className=" text-center">You have no Bookings </p>;
    return (
      <>
        {data?.bookingUpcoming.map((data) => {
          return <Booking key={data.id} bookingData={data} />;
        })}
      </>
    );
  };
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10 w-full">
      <div className="  flex justify-center">
        <h2 className="text-5xl"> Bookings</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full overflow-y-auto ">
        <h3 className=" my-5 text-3xl">Upcoming Times</h3>
        <UpcomingBookings />
        <h3 className=" my-5 text-3xl">Past Bookings</h3>

        <PastBookings />
      </div>{" "}
      <p>For cancelation or rescheduling contact Jana on Discord </p>
    </div>
  );
}
export default Bookings;
