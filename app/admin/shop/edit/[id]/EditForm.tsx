"use client";
import { shop } from "@prisma/client";
import React, { useState } from "react";

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

  return (
    <form className="w-full space-y-4">
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
        <input id="imageUrl" className="input" type="text" />
      </div>
      <div className="flex flex-col gap-2">
        <label className=" label-text text-lg text-center" htmlFor="privacy">
          {" "}
          Duration
        </label>
        <select className="select w-full" name="privacy" id="privacy">
          <option value="50min">50min</option>
          <option value="30min">30min</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className=" label-text text-lg text-center" htmlFor="privacy">
          {" "}
          Privacy
        </label>
        <select className="select w-full" name="privacy" id="privacy">
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
      </div>
      <button className="btn w-full">Edit</button>
    </form>
  );
}

export default EditForm;
