"use client";
import { ShopItem } from "@/types";
import { shop } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  item: shop;
};

function EditForm({ item }: Props) {
  const [title, setTitle] = useState(item.title);
  const [desc, setDesc] = useState(item.desc);
  const [price, setPrice] = useState(item.paypal_price);
  const [image, setImage] = useState(item.image);
  const [privacy, setPrivacy] = useState(item.privacy);
  const [duration, setDuration] = useState(item.duration);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      price,
      image,
      privacy,
      duration,
    }: ShopItem) => {
      return await axios({
        url: `/api/admin/shop/update`,
        method: `PUT`,
        data: {
          id,
          title,
          desc: description,
          paypal_price: price,
          image,
          privacy,
          duration,
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

  const onSubmit: SubmitHandler<any> = () => {
    mutation.mutate({
      id: item.id,
      title,
      description: desc,
      price,
      image,
      privacy,
      duration,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <div className="flex flex-col gap-2">
        {" "}
        <label className=" label-text text-lg text-center" htmlFor="title">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
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
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
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
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
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
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
          id="imageUrl"
          className="input"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className=" label-text text-lg text-center" htmlFor="privacy">
          {" "}
          Duration
        </label>
        <select
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
          className="select w-full"
          name="privacy"
          id="privacy"
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
          value={privacy}
          onChange={(e) => {
            setPrivacy(e.target.value as "Private" | "Public");
          }}
          className="select w-full"
          name="privacy"
          id="privacy"
        >
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
      </div>
      <button className="btn w-full">Edit</button>
    </form>
  );
}

export default EditForm;
