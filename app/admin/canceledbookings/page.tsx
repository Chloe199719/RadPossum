import prismaClient from "@/lib/prisma/prismaClient";
import { DiscordData } from "@/types";
import axios from "axios";
import Booking from "../UpBooking";
import UpComingBookings from "./pastbookings";

type Props = {};
async function fetchBookingData() {
  const data = await prismaClient.booking.findMany({
    where: {
      canceled: true,
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
    const discordInfo = await axios({
      url: `https://discord.com/api/users/${id}`,
      method: "GET",
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT}` },
    });
    return discordInfo.data;
  } catch (error) {
    return `not found`;
  }
}
async function Page({}: Props) {
  const data = await fetchBookingData();
  const discord = Promise.all(
    data.map(async (booking) => {
      const discordInfo: DiscordData = await Account(booking.discordID);
      return { ...booking, discordInfo };
    })
  );
  const bookingData = await discord;
  return <UpComingBookings data={bookingData} />;
}
export default Page;
