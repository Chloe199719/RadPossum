"use client";
import { FormItem } from "@/types";
import { Questions } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  item: Questions;
};
function QuestionForm({ item }: Props) {
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id, question, answer }: FormItem) => {
      return await axios({
        url: `/api/admin/settings/QuestionsandAnswers/update`,
        method: `PATCH`,
        data: {
          id,
          question,
          answer,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Q&A Updated`);
      router.refresh();
      router.push("/admin/settings/QuestionsandAnswers/");
    },
    onError: () => {
      toast.error(`Error Updating Q&A`);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ id: item.id, question, answer });
      }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-3">
        <label className="label-text text-lg  text-center" htmlFor="question">
          Question
        </label>
        <textarea
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          className="textarea text-xl"
          id="question"
          rows={5}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="label-text text-lg  text-center" htmlFor="question">
          Answer
        </label>
        <textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          className="textarea text-xl"
          id="question"
          rows={5}
        />
      </div>
      <button disabled={mutation.isLoading} className="btn w-full">
        Update
      </button>
    </form>
  );
}
export default QuestionForm;
