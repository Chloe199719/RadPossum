import { SocialMediaShort } from "@/types";
import { SocialMedia } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { BsFillEraserFill, BsPencilFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {
  item: SocialMediaShort;
  setEdit: Dispatch<SetStateAction<boolean>>;
};
function Actions({ item, setEdit }: Props) {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await axios({
        url: `/api/admin/settings/socialmedia/delete?id=${id}`,
        method: `DELETE`,
      });
    },
    onSuccess: () => {
      toast.success(`@${item.name} Delete`);
      router.refresh();
      setEdit(false);
    },
    onError: () => {
      toast.error(`Failed to Delete @${item.name}`);
    },
  });
  return (
    <div className="flex gap-2">
      <BsPencilFill
        onClick={() => {
          setEdit(true);
        }}
        className="h-6 w-6 hover:text-slate-600 active:text-blue-600"
      />{" "}
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
                mutation.mutate({ id: item.id });
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
export default Actions;
