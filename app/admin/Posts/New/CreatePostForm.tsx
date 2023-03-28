"use client";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import { PostForm, PostMutation } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
type Props = {};
function CreatePostForm({}: Props) {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostForm>();

  const mutation = useMutation({
    mutationFn: async ({ formData, message }: PostMutation) => {
      return await axios({
        url: `/api/admin/posts/createPost`,
        method: `post`,
        data: {
          title: formData.title,
          content: message,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Message sent to `);

      router.push(`/blog/${mutation.data?.data.id}`);
      reset();
    },
    onError: () => {
      toast.error(`Error Creating Post`);
    },
  });

  const onSubmit: SubmitHandler<PostForm> = (data) => {
    mutation.mutate({ formData: data, message: message });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
      <div className="flex flex-col gap-1 items-center">
        <label className=" label text-lg" htmlFor="title">
          Title
        </label>
        <input
          className="input w-full"
          type="text"
          id="title"
          {...register("title")}
          required
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <label className="label text-lg" htmlFor="content">
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
      <button disabled={mutation.isLoading} className="btn w-full">
        Create Post
      </button>
    </form>
  );
}
export default CreatePostForm;
