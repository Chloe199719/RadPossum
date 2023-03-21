import prismaClient from "@/lib/prisma/prismaClient";
import Booking from "../Booking";
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
async function Page({}: Props) {
  const data = await fetchBookingData();
  return <UpComingBookings data={data} />;
}
export default Page;
