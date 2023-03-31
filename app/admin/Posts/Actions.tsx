import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";
type Props = {
  postID: string;
};
function Actions({ postID }: Props) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id }: any) => {
      return await axios({
        url: `/api/admin/posts/delete?id=${id}`,
        method: `DELETE`,
      });
    },
    onSuccess: () => {
      toast.success(`Post Deleted`);
      router.refresh();
      setShow(false);
    },
    onError: () => {
      toast.error(`Error Deleting Post`);
    },
  });
  return (
    <div className="flex-1 flex justify-end w-full px-12 gap-2">
      <Link href={`/admin/Posts/edit/${postID}`}>
        {" "}
        <div className="tooltip  tooltip-left" data-tip="Edit Post">
          {" "}
          <AiOutlineEdit className="w-8 h-8" />
        </div>{" "}
      </Link>
      {!show ? (
        <div className="tooltip  tooltip-left" data-tip="Delete">
          <AiOutlineDelete
            className="w-8 h-8"
            onClick={() => {
              setShow(true);
            }}
          />
        </div>
      ) : null}
      {show ? (
        <div className="flex gap-2">
          <div className="tooltip  tooltip-left" data-tip="Cancel">
            <GiCancel
              onClick={() => {
                setShow(false);
              }}
              className="w-8 h-8 text-red-700"
            />
          </div>
          <div className="tooltip  tooltip-right" data-tip="Confirm">
            <button
              disabled={mutation.isLoading}
              onClick={() => {
                mutation.mutate({ id: postID });
              }}
            >
              <AiOutlineCheck className="w-8 h-8 text-green-700" />
            </button>
          </div>
        </div>
      ) : null}
      <div>Actions</div>
    </div>
  );
}
export default Actions;
