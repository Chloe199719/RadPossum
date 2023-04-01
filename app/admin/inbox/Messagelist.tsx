"use client";

import { Message } from "@/types";
import { useRouter } from "next/navigation";
import MessageItem from "./MessageItem";

type Props = {
  messages: Message[];
  searchParams: {
    page: string | null;
  };
};
function MessageList({ messages, searchParams }: Props) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const router = useRouter();

  return (
    <div className="w-full space-y-6 ">
      <div className="flex flex-col gap-2">
        {messages.length !== 0 ? (
          messages.map((message) => {
            return <MessageItem key={message.id} message={message} />;
          })
        ) : (
          <div className="w-full flex justify-center items-center">
            <h2 className="text-3xl">No Messages</h2>
          </div>
        )}
      </div>
      <div className="btn-group flex justify-center">
        <button
          onClick={() => {
            router.push(`/admin/inbox?page=${page === 1 ? page : page - 1}`);
          }}
          className="btn"
        >
          «
        </button>
        <button className="btn">Page {page}</button>
        <button
          className="btn"
          onClick={() => {
            router.push(`/admin/inbox?page=${page + 1}`);
          }}
        >
          »
        </button>
      </div>
    </div>
  );
}
export default MessageList;
