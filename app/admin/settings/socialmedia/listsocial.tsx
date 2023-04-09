"use client";

import { SocialMedia } from "@prisma/client";
import ItemSocial from "./ItemSocial";
import { SocialMediaShort } from "@/types";
import { useState } from "react";
import CreateForm from "./CreateForm";

type Props = {
  data: SocialMediaShort[];
};
function ListSocial({ data }: Props) {
  const [create, setCreate] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => {
        return <ItemSocial key={item.id} item={item} />;
      })}
      {create && <CreateForm setCreate={setCreate} />}
      <button
        onClick={() => {
          setCreate(true);
        }}
        className="btn w-full"
      >
        Create New Social
      </button>
    </div>
  );
}
export default ListSocial;
