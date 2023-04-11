import { avaiable_hours } from "@prisma/client";
import dynamic from "next/dynamic";
import React from "react";

const Actions = dynamic(() => import("./Actions"), {
  ssr: false,
});
type Props = {
  hour: avaiable_hours;
  index: number;
};

function Items({ hour, index }: Props) {
  const hour1 = 3600000;
  return (
    <tr className="text-lg">
      <th>{index + 1}</th>
      <td>{hour.hour / hour1}:00</td>

      <td>
        <Actions hour={hour} />
      </td>
    </tr>
  );
}

export default Items;
