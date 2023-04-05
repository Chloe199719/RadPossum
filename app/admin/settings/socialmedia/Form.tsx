import { SocialMedia } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  item: SocialMedia;
  setEdit: Dispatch<SetStateAction<boolean>>;
};
function Form({ item }: Props) {
  const [name, setName] = useState(item.name);
  const [socialmedia_url, setSocialmedia_url] = useState(item.socialmedia_url);
  return (
    <div className="border-2 rounded-lg border-black grid grid-cols-3 px-4 py-5">
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        value={socialmedia_url}
        onChange={(e) => {
          setSocialmedia_url(e.target.value);
        }}
      />
      <span className=" justify-self-end">Actions</span>
    </div>
  );
}
export default Form;
