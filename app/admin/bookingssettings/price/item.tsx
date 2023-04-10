import { paypal_items } from "@prisma/client";
import React, { useState } from "react";

type Props = {
  item: paypal_items;
};

function Item({ item }: Props) {
  const [edit, setEdit] = useState(false);
  return (
    <div className="border-2 rounded-lg border-black grid grid-cols-4 px-4 py-5">
      <span>{item.title}</span>
      {!edit ? (
        <div className="grid grid-cols-2 col-span-2">
          <span>{item.price_standard}$</span>
          <span>{item.price_saturday}$</span>
        </div>
      ) : null}
      <span className=" justify-self-end">test</span>
    </div>
  );
}

export default Item;
