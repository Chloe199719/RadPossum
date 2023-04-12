import React from "react";
import Items from "./Items";
import { shop } from "@prisma/client";

type Props = {
  shop: shop[];
};

function Table({ shop }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th className="text-lg">Title</th>
            <th className="text-lg ">Description</th>
            <th className="text-lg ">Price</th>
            <th className="text-lg ">Image</th>
            <th className="text-lg ">Privacy</th>
            <th className="text-lg ">Duration</th>
            <th className="text-lg ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shop.map((shop, i) => (
            <Items key={shop.id} shop={shop} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
