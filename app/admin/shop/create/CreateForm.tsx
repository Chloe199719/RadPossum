"use client";
import { CreateShopItem } from "@/types";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {};

function CreateForm({}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateShopItem>();

  const mutation = useMutation({
    mutationFn: async (data: CreateShopItem) => {
      console.log(data);
      return await axios({
        url: `/api/admin/shop/create`,
        method: `POST`,
        data: {
          title: data.title,
          desc: data.description,
          paypal_price: data.price,
          image: data.image,
          privacy: data.privacy,
          duration: data.duration,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Product updated`);
      router.refresh();
      router.push(`/admin/shop`);
    },
    onError: () => {
      toast.error(`Error updating product`);
    },
  });

  const onSubmit: SubmitHandler<CreateShopItem> = (data) => {
    mutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <div className="flex flex-col gap-2">
        {" "}
        <label className=" label-text text-lg text-center" htmlFor="title">
          Title
        </label>
        <input
          {...register("title")}
          id="title"
          className="input"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        {" "}
        <label
          className=" label-text text-lg text-center"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          rows={6}
          className="input"
          id="description"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className=" label-text text-lg text-center" htmlFor="price">
          Price
        </label>
        <div className=" input-group w-full">
          <span className="bg-gray-400">Price</span>
          <input
            {...register("price")}
            id="price"
            className="input flex-1 text-right p-3"
            type="number"
          />
          <span className="bg-gray-400">$</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {" "}
        <label className=" label-text text-lg text-center" htmlFor="imageUrl">
          Image Url
        </label>
        <input
          {...register(`image`)}
          id="imageUrl"
          className="input"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className=" label-text text-lg text-center" htmlFor="duration">
          {" "}
          Duration
        </label>
        <select
          {...register("duration")}
          className="select w-full"
          name="duration"
          id="duration"
        >
          <option value="50min">50min</option>
          <option value="30min">30min</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className=" label-text text-lg text-center" htmlFor="privacy">
          {" "}
          Privacy
        </label>
        <select
          {...register("privacy")}
          className="select w-full"
          name="privacy"
          id="privacy"
        >
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
      </div>
      <button className="btn w-full">Create new Article</button>
    </form>
  );
}

export default CreateForm;
