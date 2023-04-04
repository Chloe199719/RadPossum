import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
        url: `/api/admin/settings/QuestionsandAnswers?id=${id}`,
        method: `DELETE`,
      });
    },
    onSuccess: () => {
      toast.success(`Item Deleted`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Item Deleted`);
    },
  });
  return (
    <div className="flex justify-end w-full space-x-3">
      <BsPencilFill className="h-6 w-6 hover:text-slate-600 active:text-blue-600" />
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
