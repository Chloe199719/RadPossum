import prismaClient from "../prisma/prismaClient";

export default async function completeBooking(id: string) {
  try {
    const bookingUpdate = await prismaClient.booking.update({
      where: {
        id: id,
      },
      data: {
        completed: true,
      },
    });
    return bookingUpdate;
  } catch (error) {
    return Promise.reject({ message: `Could not Update Booking` });
  }
}
