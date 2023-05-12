"use client";

import { booking } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
const Time = dynamic(() => import("./GeTTime"), {
  ssr: false,
});
type Props = {
  bookings: booking[];
};
function Bookings({ bookings }: Props) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({
      route,
      currentValue,
      bookingId,
    }: {
      route: string;
      currentValue: string;
      bookingId: string;
    }) => {
      if (currentValue === "Blocked") {
        return Promise.reject("Blocked");
      }
      return await axios({
        url: `/api/admin/users/booking/${route}/`,
        method: `PUT`,
        data: {
          value: currentValue,
          id: bookingId,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Booking Updated`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Error updating Booking`);
    },
  });
  return (
    <div className="flex flex-col w-full gap-3 items-center">
      <div className="overflow-x-auto w-full">
        <table className="table table-compact w-full table-fixed">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Date</th>
              <th>Privacy</th>
              <th>Canceled</th>
              <th>Duration</th>
              <th>Message</th>
              <th className="text-center">Completed</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              if (index >= (page - 1) * 10 && index < page * 10) {
                return (
                  <tr key={booking.id}>
                    <Time time={booking.time} />
                    <td
                      onClick={() => {
                        if (booking.canceled || booking.completed) return;
                        mutation.mutate({
                          route: "privacy",
                          currentValue: booking.public_or_private,
                          bookingId: booking.id,
                        });
                      }}
                      className={`cursor-pointer link-hover link ${
                        booking.public_or_private === "Public"
                          ? " bg-blue-400"
                          : "bg-yellow-400"
                      }`}
                    >
                      {booking.public_or_private}
                    </td>
                    <td
                      className={`${
                        booking.canceled
                          ? " bg-red-400"
                          : " bg-green-400 cursor-pointer link-hover link"
                      }  `}
                    >
                      {booking.canceled ? (
                        "Its Canceled"
                      ) : (
                        <Link
                          href={`/admin/upcomingbookings/cancel?data=${booking.id}`}
                        >
                          Not Canceled
                        </Link>
                      )}
                    </td>
                    <td
                      onClick={() => {
                        if (booking.canceled || booking.completed) return;
                        mutation.mutate({
                          route: "duration",
                          currentValue: booking.bookedTime,
                          bookingId: booking.id,
                        });
                      }}
                      className={`${
                        booking.bookedTime === "30min"
                          ? " bg-purple-400"
                          : booking.bookedTime === "50min"
                          ? "bg-rose-400"
                          : " bg-red-600"
                      } cursor-pointer link-hover link `}
                    >
                      {booking.bookedTime}
                    </td>
                    <td className="break-normal whitespace-normal">
                      {booking.message}
                    </td>
                    <td
                      className={`${
                        booking.completed
                          ? " bg-green-600"
                          : " bg-blue-300 cursor-pointer link-hover link"
                      }  `}
                    >
                      {booking.completed ? (
                        "Completed"
                      ) : (
                        <Link
                          href={`/admin/upcomingbookings/finish?data=${booking.id}`}
                        >
                          Not Completed
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="btn-group ">
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
            setPage(bookings.length / 10 > page ? page + 1 : page);
          }}
          className="btn"
        >
          »
        </button>
      </div>
    </div>
  );
}
export default Bookings;
