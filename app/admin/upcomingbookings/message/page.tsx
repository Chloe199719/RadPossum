import prismaClient from "@/lib/prisma/prismaClient";
import Form from "./form";

type Props = {};
type searchParam = {
  data: string | null;
};
async function fetchBooking(id: string) {
  try {
    const data = await prismaClient.booking.findUnique({
      where: { id: id },
      include: {
        User: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function Page({ searchParams }: any) {
  if (!searchParams.data) return <div>Error</div>;
  const data = await fetchBooking(searchParams.data);
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl">Messaging : {`${data?.User.name}`}</h2>
      <Form bookingData={data} />
    </div>
  );
}
export default Page;
