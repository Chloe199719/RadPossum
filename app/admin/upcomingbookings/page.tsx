import prismaClient from "@/lib/prisma/prismaClient";
import { DiscordData } from "@/types";
import axios from "axios";

import UpComingBookings from "./upcomingbookings";

type Props = {};
async function fetchBookingData() {
  const data = await prismaClient.booking.findMany({
    where: {
      canceled: false,
      completed: false,
    },
    include: {
      User: true,
    },
    orderBy: {
      time: "asc",
    },
  });
  return data;
}
async function Account(id: string) {
  try {
    const data = await prismaClient.account.findUnique({
      where: { userId: id },
      select: { providerAccountId: true },
    });
    const discordInfo = await axios({
      url: `https://discord.com/api/users/${data?.providerAccountId}`,
      method: "GET",
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT}` },
    });
    return discordInfo.data;
  } catch (error) {
    console.log(`Not Found`);
    return `not found`;
  }
}
async function Page({}: Props) {
  const data = await fetchBookingData();
  const discord = Promise.all(
    data.map(async (booking) => {
      const discordInfo: DiscordData = await Account(booking.User.id!);
      return { ...booking, discordInfo };
    })
  );
  const bookingData = await discord;

  return <UpComingBookings data={bookingData} />;
}
export default Page;
