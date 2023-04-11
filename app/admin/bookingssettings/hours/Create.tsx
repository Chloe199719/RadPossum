"use client";
import { hourForm } from "@/types";
import { avaiable_hours } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  hours: avaiable_hours[];
};

function Create({ hours }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<hourForm>();
  const [create, setCreate] = useState(false);
  const exitingHours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const hoursArray = hours.map((hour) => {
    return hour.hour / 3600000;
  });
  const newHours = exitingHours.filter((hour) => {
    return !hoursArray.includes(hour);
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ hour }: { hour: number }) => {
      return await axios({
        url: `/api/admin/bookingssettings/hours/create`,
        method: `POST`,
        data: {
          hour,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Created Hour `);
      router.refresh();
    },
    onError: () => {
      toast.error(`Failed to Create Hour`);
    },
  });
  const onSubmit: SubmitHandler<hourForm> = (data) => {
    mutation.mutate({ hour: data.hour });
  };
  return (
    <div className="w-full">
      {!create ? (
        <button
          onClick={() => {
            setCreate(true);
          }}
          className="btn w-full"
        >
          Add Hour
        </button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <select className="select w-full" {...register("hour")}>
            {newHours.map((hour) => {
              return (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
          <div className="btn-group w-full flex">
            <button type="submit" className="btn btn-success flex-1">
              Create
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                setCreate(false);
              }}
              className="btn btn-warning flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Create;
