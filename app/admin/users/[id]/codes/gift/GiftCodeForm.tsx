"use client";

import { LessonCodesGift } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = { id: string };
function GiftCodeForm({ id }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonCodesGift>();
  const mutation = useMutation({
    mutationFn: async ({
      id,
      duration,
      privacy,
    }: {
      id: string;
      duration: string;
      privacy: string;
    }) => {
      return await axios({
        url: `/api/admin/users/code/gift`,
        method: `POST`,
        data: {
          userID: id,
          duration: duration,
          privacy: privacy,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Code Created`);
      router.refresh();
      router.push(`/admin/users/${id}`);
    },
    onError: () => {
      toast.error(`Error Gifting Code`);
    },
  });
  const onSubmit: SubmitHandler<LessonCodesGift> = (data) => {
    mutation.mutate({ ...data, id: id });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" form-control">
      <div className="flex gap-3">
        <label className="flex-1 flex flex-col label" htmlFor="privacy">
          <span className="label-text text-center">Privacy</span>
          <select
            id="privacy"
            className="select select-bordered w-full "
            {...register("privacy")}
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </label>
        <label className="flex-1 flex flex-col label" htmlFor="duration">
          <span className="label-text text-center">Duration</span>
          <select
            id="duration"
            className="select select-bordered w-full  "
            {...register("duration")}
          >
            <option value="50min">50min</option>
            <option value="30min">30min</option>
          </select>
        </label>
      </div>
      <button className="btn btn-primary w-full mt-4 mx-2">Gift Code</button>
    </form>
  );
}
export default GiftCodeForm;
