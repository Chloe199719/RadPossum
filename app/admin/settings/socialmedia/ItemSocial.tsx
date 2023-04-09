import { SocialMedia } from "@prisma/client";
import { useState } from "react";
import Actions from "./Actions";
import Form from "./Form";
import { SocialMediaShort } from "@/types";

type Props = {
  item: SocialMediaShort;
};
function ItemSocial({ item }: Props) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {!edit ? (
        <div className="border-2 rounded-lg border-black grid grid-cols-3 px-4 py-5">
          <span>{item.name}</span>
          <span>{item.socialmedia_url}</span>
          <span className=" justify-self-end">
            <Actions item={item} setEdit={setEdit} />
          </span>
        </div>
      ) : (
        <Form item={item} setEdit={setEdit} />
      )}
    </>
  );
}
export default ItemSocial;
