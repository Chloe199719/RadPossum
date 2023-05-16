"use client";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
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
    try {
      const zMessage = z.string().trim().min(1).max(200).parse(message);
      const comment = await axios.put(`/api/posts/editComment`, {
        message: zMessage,
        commentID: commentID,
      });
      setMessage(``);
      toast.success(`Comment Edited`);
      return comment;
    } catch (error: any) {
      if (error.name === "ZodError") {
        toast.error(error.issues[0].message);
        return;
      }
      toast.error("Error");
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
      <div className="flex justify-between">
        <span
          className={`${
            message.length <= 200 ? "text-green-400" : "text-red-400"
          } text`}
        >
          {message.length === 0 ? "" : message.length}
        </span>
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
      </div>
    </form>
  );
}
export default EditCommentBox;
