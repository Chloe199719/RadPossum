"use client";
import { avaiable_hours } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {
  hour: avaiable_hours;
};

function Actions({ hour }: Props) {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await axios({
        url: `/api/admin/bookingssettings/hours/delete/?id=${id}`,
        method: `DELETE`,
      });
    },
    onSuccess: () => {
      toast.success(`Deleted ${hour.hour} `);
      router.refresh();
    },
    onError: () => {
      toast.error(`Failed to delete ${hour.hour}`);
    },
  });
  return (
    <div className="flex justify-end mr-6">
      {!confirm ? (
        <AiOutlineCloseCircle
          onClick={() => {
            setConfirm(true);
          }}
          className="w-6 h-6 text-red-600  "
        />
      ) : (
        <span className=" justify-self-end flex items-center gap-2">
          <button
            disabled={mutation.isLoading}
            type="submit"
            className="disabled:bg-slate-500"
          >
            <GiConfirmed
              onClick={() => {
                mutation.mutate({ id: hour.id });
              }}
              className="h-6 w-6 text-green-500 hover:text-green-400 active:text-green-800"
            />
          </button>
          <HiBan
            onClick={() => {
              setConfirm(false);
            }}
            className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800"
          />
        </span>
      )}
    </div>
  );
}

export default Actions;
