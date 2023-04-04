import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFillEraserFill, BsPencilFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";
type Props = {
  id: string;
};
function ActionsQuestions({ id }: Props) {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await axios({
        url: `/api/admin/settings/QuestionsandAnswers/delete?id=${id}`,
        method: `DELETE`,
      });
    },
    onSuccess: () => {
      toast.success(`Item Deleted`);
      router.push("/admin/settings/QuestionsandAnswers/");
    },
    onError: () => {
      toast.error(`Error Deleting Item`);
    },
  });
  return (
    <div className="flex justify-end w-full space-x-3">
      <Link href={`/admin/settings/QuestionsandAnswers/edit/${id}`}>
        <BsPencilFill className="h-6 w-6 hover:text-slate-600 active:text-blue-600" />
      </Link>
      {!confirm ? (
        <BsFillEraserFill
          onClick={() => {
            setConfirm(true);
          }}
          className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800"
        />
      ) : (
        <>
          <button
            disabled={mutation.isLoading}
            className="disabled:bg-slate-500"
          >
            <GiConfirmed
              onClick={() => {
                mutation.mutate({ id });
              }}
              className="h-6 w-6 text-green-500 hover:text-green-400 active:text-green-800"
            />
          </button>

          <HiBan
            onClick={() => {
              setConfirm(false);
            }}
            className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800"
          />
        </>
      )}
    </div>
  );
}
export default ActionsQuestions;
