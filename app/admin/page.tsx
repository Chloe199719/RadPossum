import prismaClient from "@/lib/prisma/prismaClient";
import Booking from "./UpBooking";

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
    take: 10,
  });
  return data;
}
async function Page({}: Props) {
  const data = await fetchBookingData();
  return (
    <div className="w-full space-y-5">
      <h2 className="text-center text-3xl">Next Upcoming </h2>
      <ul className="space-y-2">
        {data.map((booking) => {
          return <Booking key={booking.id} bookingData={booking} />;
        })}
      </ul>
    </div>
  );
}
export default Page;
