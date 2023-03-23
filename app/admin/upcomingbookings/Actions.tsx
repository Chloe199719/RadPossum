import { UpcomingBookings } from "@/types";
import { GiCancel } from "react-icons/gi";
import { AiFillMessage, AiOutlineCheck } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

type Props = { bookingData: UpcomingBookings };
function Actions({ bookingData }: Props) {
  return (
    <div className="flex gap-2">
      <BsDiscord title="Discord Message" className="w-6 h-6" />
      <AiFillMessage title="Email" className="w-6 h-6" />
      <GiCancel title="Cancel" className="w-6 h-6" />
      <AiOutlineCheck title="Finish" className="w-6 h-6" />
    </div>
  );
}
export default Actions;
