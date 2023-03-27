import { UpcomingBookings } from "@/types";
import { GiCancel } from "react-icons/gi";
import { AiFillMessage, AiOutlineCheck } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import Link from "next/link";
import { booking } from "@prisma/client";

type Props = { bookingData: booking };
function Actions({ bookingData }: Props) {
  return (
    <div className="flex gap-2">
      <BsDiscord title="Discord Message" className="w-6 h-6" />
      <Link
        href={`/admin/pastbookings/message/?data=${encodeURIComponent(
          bookingData.id
        )}`}
      >
        <AiFillMessage
          title="Email"
          className="w-6 h-6 hover:bg-gray-200 rounded-full"
        />
      </Link>
    </div>
  );
}
export default Actions;
