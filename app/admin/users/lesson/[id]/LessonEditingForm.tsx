"use client";

import { LessonEditForm } from "@/types";
import { lessons, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const Time = dynamic(() => import("./gettime"), {
  ssr: false,
});

type Props = {
  lesson: lessons & {
    User: User;
  };
};
function LessonEditingForm({ lesson }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonEditForm>();

  const mutation = useMutation({
    mutationFn: async (data: LessonEditForm) => {
      return await axios({
        url: `/api/admin/users/lesson/update`,
        method: `PUT`,
        data: { ...data, id: lesson.id },
      });
    },
    onSuccess: () => {
      toast.success(`Product updated`);
      router.refresh();
      router.push(`/admin/users/${lesson.userID}`);
    },
    onError: () => {
      toast.error(`Error updating product`);
    },
  });

  const onSubmit: SubmitHandler<LessonEditForm> = (data) => {
    mutation.mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <div className="w-full flex justify-between gap-3 text-xl">
        <span>
          User : {lesson.User.name}
          <span className="text-sm text-gray-500">{lesson.User.discord}</span>
        </span>{" "}
        <span>
          Date: <Time time={lesson.time} />
        </span>
      </div>
      <div className="w-full">
        <label
          className="flex flex-col label-text text-lg text-center gap-2"
          htmlFor="title"
        >
          <span>Title</span>
          <input
            className="w-full input input-primary"
            type="text"
            id="title"
            defaultValue={lesson.lessonTitle}
            {...register("title", { required: true })}
          />
        </label>
      </div>
      <div className="w-full">
        <label
          className="flex flex-col label-text text-lg text-center gap-2"
          htmlFor="recoding"
        >
          <span>Recording</span>
          <input
            className="w-full input input-primary"
            type="text"
            {...register("recording", { required: true })}
            id="recoding"
            defaultValue={lesson.recording}
          />
        </label>
      </div>
      <div>
        <label
          className="flex flex-col label-text text-lg text-center gap-2"
          htmlFor="notes"
        >
          <span>Notes</span>
          <textarea
            className="textarea w-full textarea-primary"
            id="notes"
            {...register("notes", { required: true })}
            defaultValue={lesson.notes ? lesson.notes : ""}
          />
        </label>
      </div>
      <div>
        <label
          className="flex flex-col label-text text-lg text-center gap-2"
          htmlFor="Homework"
        >
          <span>Homework</span>
          <textarea
            className="textarea w-full textarea-primary"
            {...register("homework", { required: true })}
            id="Homework"
            defaultValue={lesson.homework ? lesson.homework : ""}
          />
        </label>
      </div>
      <button
        disabled={mutation.isLoading}
        className="w-full btn btn-primary mt-3"
      >
        Update
      </button>
    </form>
  );
}
export default LessonEditingForm;
