"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  user: string;
  discount: number;
};

interface Discount {
  discount: number;
}
function DiscountForm({ discount, user }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Discount>();
  const mutation = useMutation({
    mutationFn: async ({
      user,
      discount,
    }: {
      discount: number;
      user: string;
    }) => {
      return await axios({
        url: `/api/admin/users/discount`,
        method: `PUT`,
        data: {
          user,
          discount,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Discount Updated`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Error Updating Discount`);
    },
  });
  const onSubmit: SubmitHandler<Discount> = (data) => {
    mutation.mutate({ ...data, user: user });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full"
    >
      <h4 className="text-2xl text-center">Discount</h4>
      <label className="label-text text-lg pl-2" htmlFor="discount">
        Current Discount: {discount}
      </label>
      <div className="w-full flex  gap-4">
        <input
          className=" flex-1 input input-primary"
          type="number"
          step={0.1}
          id="discount"
          defaultValue={discount}
          min={0}
          max={1}
          {...register("discount")}
        />
        <button className="btn btn-primary btn-wide">Update</button>
      </div>
    </form>
  );
}
export default DiscountForm;
