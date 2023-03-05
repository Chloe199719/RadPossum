"use client";
import React, { use, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { booking } from "@prisma/client";

type Props = {
  bookingData: booking;
};
function Booking({ bookingData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="flex flex-col gap-3 border border-black rounded-lg bg-[#30bead]/30 w-full  px-4 py-2 hover:bg-[#30bead] hover:cursor-pointer"
    >
      <div className="flex gap-3 justify-between w-full">
        <h4 className=" text-lg uppercase">{bookingData.bookedTime}</h4>
        <span className="text-lg">{`${bookingData.date} at ${bookingData.hour} UTC`}</span>
        <span className="text-lg">{bookingData.public_or_private}</span>
        {isOpen ? (
          <ArrowDownIcon className="w-6 h-6" />
        ) : (
          <ArrowUpIcon className="w-6 h-6" />
        )}
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-2">
          <hr className="border-1 border-gray-600  flex-1  " />
          <div className="flex justify-between flex-1">
            <h5>Discord ID</h5>
            <p>{bookingData.discordID}</p>
          </div>
          <hr className="border-1 border-gray-600  flex-1  " />
          <div className="flex justify-between flex-1 gap-6">
            <h5>Message</h5>
            <p>{bookingData.message}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Booking;
