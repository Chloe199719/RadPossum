import { Message } from "@/types";
import { useState } from "react";

type Props = {
  message: Message;
};
function MessageItem({ message }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`flex-1 w-full flex flex-col border-2 ${
        message.readSolved ? "border-green-400" : "border-red-400"
      } py-4 px-2 rounded-md`}
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="grid grid-cols-3 w-full "
      >
        <span>{`${message.name} ${
          message.pronouns?.length !== 0 ? `(${message.pronouns})` : ""
        }`}</span>
        <span className="">{message.Subject}</span>
        <span className=" justify-self-end">
          {new Date(message.createdAt).toLocaleString()}
        </span>
      </div>{" "}
    </div>
  );
}
export default MessageItem;
