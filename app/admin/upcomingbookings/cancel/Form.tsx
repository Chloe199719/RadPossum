"use client";

import { Booking, CancelBooking, CancelData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
type Props = {
  BookingData: Booking | null | undefined;
};
function Form({ BookingData }: Props) {
  const [confirm, setConfirm] = useState(false);
  const [disable, setDisable] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CancelData>();

  const mutation = useMutation({
    mutationFn: (data: CancelBooking) => {
      return axios({
        url: `/api/admin/upcomingbookings/cancelBooking`,
        method: `post`,
        data: {
          id: data.booking.id,
          reason: data.data.reason,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Created Lesson for ${BookingData?.User.name}`);
      router.push(`/admin/upcomingbookings`);
      reset();
    },
    onError: () => {
      toast.error(`Error Creating Lesson for ${BookingData?.User.name}`);
    },
  });

  const onSubmit: SubmitHandler<CancelData> = (data) => {
    mutation.mutate({ data: data, booking: BookingData! });
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="reason">Reason</label>
          <input type="text" id="reason" {...register(`reason`)} />
        </div>

        {!confirm && (
          <button
            onClick={() => {
              setConfirm(!confirm);
              setTimeout(() => {
                setDisable(!disable);
              }, 2000);
            }}
            type="button"
            className="btn btn-warning"
          >
            Cancel
          </button>
        )}

        {confirm && (
          <div className="flex w-full gap-2">
            {" "}
            <button
              type="submit"
              disabled={disable}
              className="btn btn-warning bg-red-600 flex-1"
            >
              Are you Sure?
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirm(!confirm);
                setDisable(!disable);
              }}
              className="btn btn-primary flex-1"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
export default Form;
