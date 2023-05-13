import { Message } from "@/types";
import { useState } from "react";
import MessageActions from "./MessageActions";

type Props = {
  message: Message;
};
function MessageItem({ message }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`flex-1 w-full flex flex-col border-2 ${
        message.readSolved ? "border-green-400" : "border-red-400"
      }  rounded-md hover:bg-slate-200 active:bg-slate-300`}
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="py-4 px-2 grid grid-cols-3 w-full  "
      >
        <span>{`${message.name} ${
          message.pronouns?.length !== 0 ? `(${message.pronouns})` : ""
        }`}</span>
        <span className="">{message.Subject}</span>
        <span className=" justify-self-end">
          {new Date(message.createdAt).toLocaleString()}
        </span>
      </div>{" "}
      {isOpen ? (
        <div className="w-full p-5 mt-5 space-y-4 bg-zinc-200">
          <hr className="h-[2px] w-full bg-slate-500" />
          <p className="text-center">Message</p>
          <p className="bg-white px-2 py-6 rounded-md">{message.message}</p>
          <hr className="h-[2px] w-full bg-slate-500" />
          <div className="grid grid-cols-3">
            <p>Contacts</p>
            <p>Email : {message.email}</p>
            <p className=" justify-self-end">Discord : {message.discordID}</p>
          </div>
          <hr className="h-[2px] w-full bg-slate-500" />
          <div className="flex justify-between">
            <span>Actions :</span>
            <MessageActions Message={message} />
          </div>
        </div>
      ) : null}{" "}
    </div>
  );
}
export default MessageItem;
