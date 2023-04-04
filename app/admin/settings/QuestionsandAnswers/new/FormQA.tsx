"use client";

import { FormQA } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {};
function FormQA({}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormQA>();

  const mutation = useMutation({
    mutationFn: async (data: FormQA) => {
      return await axios({
        url: `/api/admin/settings/QuestionsandAnswers/create`,
        method: `post`,
        data: {
          question: data.question,
          answer: data.answer,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Created Q&A`);
      router.refresh();
      router.push(`/admin/settings/QuestionsandAnswers`);
      reset();
    },
    onError: () => {
      toast.error(`Error creating Q&A`);
    },
  });

  const onSubmit: SubmitHandler<FormQA> = (data) => {
    mutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-3">
        <label className="label-text text-lg  text-center" htmlFor="question">
          Question
        </label>
        <textarea
          className="textarea text-xl"
          id="question"
          rows={5}
          {...register("question")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="label-text text-lg  text-center" htmlFor="question">
          Answer
        </label>
        <textarea
          className="textarea text-xl"
          id="question"
          rows={5}
          {...register("answer")}
        />
      </div>
      <button className="btn w-full">Create New Q&A</button>
    </form>
  );
}
export default FormQA;
