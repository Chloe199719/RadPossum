import { paypal_items } from "@prisma/client";
import React, { useState } from "react";
import Actions from "./Actions";
import Form from "./Form";

type Props = {
  item: paypal_items;
};

function Item({ item }: Props) {
  const [edit, setEdit] = useState(false);
  return (
    <div className="border-2 rounded-lg border-black grid grid-cols-4 px-4 py-5 items-center ">
      <span>{item.title}</span>
      {!edit ? (
        <div className="grid grid-cols-3 col-span-3">
          <span>{item.price_standard}$</span>
          <span>{item.price_saturday}$</span>
          <span className=" justify-self-end">
            <Actions setEdit={setEdit} item={item} />
          </span>
        </div>
      ) : (
        <Form item={item} setEdit={setEdit} />
      )}
    </div>
  );
}

export default Item;
