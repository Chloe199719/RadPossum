"use client";
import { paypal_items } from "@prisma/client";
import React from "react";
import Item from "./item";

type Props = {
  items: paypal_items[];
};

function Items({ items }: Props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className=" rounded-lg  grid grid-cols-4 px-4">
        <span>Title</span>
        <span>Standard Price</span>
        <span>Saturday Price</span>
        <span className=" justify-self-end">Actions</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Items;
