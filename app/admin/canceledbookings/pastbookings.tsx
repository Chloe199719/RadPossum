"use client";
import { UpcomingBookings } from "@/types";
import { booking } from "@prisma/client";
import { useState } from "react";
import Booking from "./UpBooking";
type Props = {
  data: UpcomingBookings[];
};

function UpComingBookings({ data }: Props) {
  const [page, setPage] = useState(1);
  return (
    <div className="w-full space-y-5 flex flex-col items-center">
      <h2 className="text-center text-3xl">Canceled Bookings</h2>
      <ul className="space-y-2 w-full">
        {data.map((booking, index) => {
          if (index >= (page - 1) * 10 && index < page * 10) {
            return <Booking key={booking.id} bookingData={booking} />;
          } else {
            return null;
          }
        })}
      </ul>
      <div className="btn-group">
        <button
          onClick={() => {
            setPage(page === 1 ? page : page - 1);
          }}
          className="btn"
        >
          «
        </button>
        <button className="btn">Page {page}</button>
        <button
          onClick={() => {
            setPage(data.length / 10 > page ? page + 1 : page);
          }}
          className="btn"
        >
          »
        </button>
      </div>
    </div>
  );
}
export default UpComingBookings;
