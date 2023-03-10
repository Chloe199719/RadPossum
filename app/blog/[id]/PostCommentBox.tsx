"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";
type Props = {
  postID: string;
};
function PostCommentBox({ postID }: Props) {
  const { data: session, status } = useSession();
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const postComment = async function () {
    if (!messageRef.current?.value) {
      return Promise.reject(`Fill Text Area`);
    }
    try {
      const comment = await axios.post(`/api/posts/newCommentPost`, {
        message: messageRef.current?.value,
        postID: postID,
      });
      messageRef.current.value = "";
      return comment;
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };
  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      console.log(`Worked Swap  to Invalidate Query`);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(), mutation.mutate();
      }}
      className="w-full space-y-4"
    >
      <textarea ref={messageRef} className="textarea w-full" />
      {status === "authenticated" ? (
        <div className="flex justify-end items-center">
          <button className="btn btn-primary w-48 text-xl">Comment</button>
          <span className="px-2 text-lg flex items-center">
            as {session?.user?.name}
            <Image
              src={session?.user ? session.user.image! : "/chloe.jpg"}
              alt={session?.user ? session.user.name! : "Default Profile Pic"}
              width={35}
              height={35}
            />
          </span>
        </div>
      ) : (
        <p className="text-lg text-right">Login To Comment </p>
      )}
    </form>
  );
}
export default PostCommentBox;
