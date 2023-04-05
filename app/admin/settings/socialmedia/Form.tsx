import { SocialMedia } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {
  item: SocialMedia;
  setEdit: Dispatch<SetStateAction<boolean>>;
};
function Form({ item, setEdit }: Props) {
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
      <span className=" justify-self-end flex items-center gap-2">
        {" "}
        <button className="disabled:bg-slate-500">
          <GiConfirmed
            onClick={() => {}}
            className="h-6 w-6 text-green-500 hover:text-green-400 active:text-green-800"
          />
        </button>
        <HiBan
          onClick={() => {
            setEdit(false);
          }}
          className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800"
        />
      </span>
    </div>
  );
}
export default Form;
