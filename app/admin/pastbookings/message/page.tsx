import prismaClient from "@/lib/prisma/prismaClient";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Form from "./form";

type Props = {
  searchParams: searchParam;
};
type searchParam = {
  data: string;
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

async function Page({ searchParams }: Props) {
  if (!searchParams.data) return <div>Error</div>;
  const data = await fetchBooking(searchParams.data);
  return (
    <div className="flex flex-col items-center w-full relative gap-4">
      <div className="flex justify-center w-full items-center relative">
        <Link
          className="absolute left-1 p-2 hover:bg-slate-400 rounded-full"
          href={"/admin/upcomingbookings"}
        >
          <AiOutlineArrowLeft className=" w-8 h-8 " />
        </Link>
        <h2 className="text-3xl text-center">
          Messaging : {`${data?.User.name}`}
        </h2>
      </div>

      <Form bookingData={data} />
    </div>
  );
}
export default Page;
