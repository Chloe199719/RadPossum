import prismaClient from "@/lib/prisma/prismaClient";
import Booking from "../UpBooking";
import UpComingBookings from "./pastbookings";

type Props = {};
async function fetchBookingData() {
  const data = await prismaClient.booking.findMany({
    where: {
      OR: [{ canceled: true }, { completed: true }],
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
