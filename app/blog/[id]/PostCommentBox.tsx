"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
type Props = {
  postID: string;
  initialValue?: string;
  autoFocus?: boolean;
  parentID?: string | null;
  closeBox?: any;
};
function PostCommentBox({
  postID,
  initialValue = "",
  autoFocus = false,
  parentID = null,
  closeBox,
}: Props) {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState(initialValue);
  const queryClient = useQueryClient();
  const postComment = async function () {
    try {
      const zMessage = z.string().trim().min(1).max(200).parse(message);
      const comment = await axios.post(`/api/posts/newCommentPost`, {
        message: zMessage,
        postID: postID,
        parentID: parentID,
      });
      setMessage(``);
      toast.success(`Comment Posted`);
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
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`Comment ${postID}`] });
    },
  });
  if (parentID !== null && mutation.isSuccess) {
    closeBox(false);
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
          <div className="flex justify-between md:justify-end items-center ">
            <button
              disabled={mutation.isLoading}
              className="btn btn-primary md:w-48 text-xl flex-1 md:flex-none"
            >
              Comment
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
export default PostCommentBox;
