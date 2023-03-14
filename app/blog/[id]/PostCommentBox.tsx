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
import { useRef, useState } from "react";
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
    if (!message.trim()) {
      return Promise.reject(`Fill Text Area`);
    }
    try {
      const comment = await axios.post(`/api/posts/newCommentPost`, {
        message: message,
        postID: postID,
        parentID: parentID,
      });
      setMessage(``);
      return comment;
    } catch (error: any) {
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
    </form>
  );
}
export default PostCommentBox;
