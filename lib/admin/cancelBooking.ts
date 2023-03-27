import prismaClient from "../prisma/prismaClient";

export default async function cancelBooking(id: string) {
  try {
    const data = await prismaClient.booking.update({
      where: {
        id: id,
      },
      data: {
        canceled: true,
      },
    });
    return data;
  } catch (error) {
    return Promise.reject({ message: `Could not Update Booking` });
  }
}
