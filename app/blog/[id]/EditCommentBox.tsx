"use client";

import myLoader from "@/lib/imageloader";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
type Props = {
  postID: string;
  initialValue?: string;
  autoFocus?: boolean;
  commentID: string;
  setisEditing: any;
};
function EditCommentBox({
  postID,
  initialValue = "",
  autoFocus = false,
  commentID,
  setisEditing,
}: Props) {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState(initialValue);
  const queryClient = useQueryClient();
  const editComment = async function () {
    if (!message.trim()) {
      return Promise.reject(`Fill Text Area`);
    }
    try {
      const comment = await axios.put(`/api/posts/editComment`, {
        message: message,
        commentID: commentID,
      });
      setMessage(``);
      return comment;
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };
  const mutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`Comment ${postID}`] });
    },
  });
  if (mutation.isSuccess) {
    setTimeout(() => {
      setisEditing(false);
    }, 200);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(), mutation.mutate();
      }}
      className="w-full space-y-4"
    >
      <textarea
        className="textarea w-full"
        autoFocus={autoFocus}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      {status === "authenticated" ? (
        <div className="flex justify-end items-center">
          <button
            disabled={mutation.isLoading}
            className="btn btn-primary w-48 text-xl"
          >
            Edit Comment
          </button>
          <span className="px-2 text-lg flex items-center">
            as {session?.user?.name}
            <Image
              className=" rounded-full"
              loader={myLoader}
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
export default EditCommentBox;
