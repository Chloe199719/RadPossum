import { UpcomingBookings } from "@/types";
import { GiCancel } from "react-icons/gi";
import { AiFillMessage, AiOutlineCheck } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import Link from "next/link";

type Props = { bookingData: UpcomingBookings };
function Actions({ bookingData }: Props) {
  return (
    <div className="flex gap-2">
      <BsDiscord title="Discord Message" className="w-6 h-6" />
      <Link
        href={`/admin/upcomingbookings/message/?data=${encodeURIComponent(
          bookingData.id
        )}`}
      >
        <AiFillMessage title="Email" className="w-6 h-6" />
      </Link>
      <GiCancel title="Cancel" className="w-6 h-6" />
      <Link href={`/admin/upcomingbookings/finish/?data=${bookingData.id}`}>
        {" "}
        <AiOutlineCheck title="Finish" className="w-6 h-6" />
      </Link>
    </div>
  );
}
export default Actions;
