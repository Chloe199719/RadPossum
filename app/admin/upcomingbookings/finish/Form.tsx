"use client";

import { Booking, Lesson, LessonData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  BookingData: Booking | null | undefined;
};
function Form({ BookingData }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Lesson>();

  const mutation = useMutation({
    mutationFn: (data: LessonData) => {
      return axios({
        url: `/api/admin/upcomingbookings/createLesson`,
        method: `post`,
        data: {
          id: data.booking.id,
          user: data.booking.User.id,
          title: data.data.title,
          recording: data.data.recording,
          notes: data.data.notes,
          homework: data.data.homework,
          time: data.booking.time,
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

  const onSubmit: SubmitHandler<Lesson> = (data) => {
    mutation.mutate({ data: data, booking: BookingData! });
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="label text-center" htmlFor="title">
            Lesson Title
          </label>
          <input
            className="input"
            type="text"
            id="title"
            required
            maxLength={20}
            placeholder="Lesson Title"
            {...register("title")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="label text-center" htmlFor="recording">
            Recording
          </label>
          <input
            className="input"
            type="text"
            id="recording"
            placeholder="Recording Link"
            required
            {...register(`recording`)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="label text-center" htmlFor="notes">
            Notes
          </label>
          <textarea
            className="textarea"
            placeholder="Notes"
            id="notes"
            required
            {...register(`notes`)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="label text-center" htmlFor="homework">
            Homework
          </label>
          <textarea
            className="textarea"
            placeholder="Homework"
            id="homework"
            required
            {...register("homework")}
          />
          <button className="btn mt-6">Create Lesson </button>
        </div>
      </form>
    </div>
  );
}
export default Form;
