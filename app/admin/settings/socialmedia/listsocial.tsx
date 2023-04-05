"use client";

import { SocialMedia } from "@prisma/client";
import ItemSocial from "./ItemSocial";

type Props = {
  data: SocialMedia[];
};
function ListSocial({ data }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => {
        return <ItemSocial key={item.id} item={item} />;
      })}
      <button className="btn w-full">Create New Social</button>
    </div>
  );
}
export default ListSocial;
