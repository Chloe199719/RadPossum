import { shop } from "@prisma/client";
import React from "react";
import Image from "next/image";
import Actions from "./Actions";
type Props = {
  shop: shop;
};

function Items({ shop }: Props) {
  return (
    <tr className="text-lg">
      <th>{shop.title}</th>
      <td className=" overflow-hidden">{shop.desc}</td>
      <td>{shop.paypal_price}$</td>
      <td className="flex justify-center items-center">
        <Image src={`${shop.image}`} width={30} height={30} alt="Item Image" />
      </td>
      <td>{shop.privacy}</td>
      <td>{shop.duration}</td>

      <td>
        <Actions shop={shop} />
      </td>
    </tr>
  );
}

export default Items;
