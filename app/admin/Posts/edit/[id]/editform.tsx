"use client";
import { EditPostSubmit, Post } from "@/types";
import { posts } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type Props = {
  post: Post;
};
function EditForm({ post }: Props) {
  const [message, setMessage] = useState(post.message);
  const [title, setTitle] = useState(post.title);
  const mutation = useMutation({
    mutationFn: async ({ e, message, title, postID }: EditPostSubmit) => {
      e.preventDefault();
      return await axios({
        url: `/api/admin/posts/editPost`,
        method: `patch`,
        data: {
          title: title,
          content: message,
          postID: postID,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Post Edited`);
      post = mutation.data?.data;
    },
    onError: () => {
      toast.error(`Error Editing Post`);
    },
  });
  return (
    <div className="flex-1">
      <p className="text-lg text-center">
        Created @ {new Date(post.createdAT).toLocaleString()}
      </p>
      <form
        onSubmit={(e) => {
          mutation.mutate({ e, message, title, postID: post.id });
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2">
          <label className="flex-1 text-center label" htmlFor="title">
            Title <span>{new Date(post.updatedAT).toLocaleString()}</span>
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="flex-1 input"
            type="text"
            id="title"
          />
          <div className="flex flex-col gap-2">
            <label className="flex-1 text-center label" htmlFor="content">
              Post Content
            </label>
            <SimpleMDE
              className="w-full"
              id="content"
              value={message}
              onChange={(e) => {
                setMessage(e);
              }}
            />
          </div>
        </div>
        <button disabled={mutation.isLoading} className="flex-1 btn">
          Edit Post
        </button>
      </form>
    </div>
  );
}
export default EditForm;
