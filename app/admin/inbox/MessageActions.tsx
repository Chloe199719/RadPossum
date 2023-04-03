import { Message, MessageSolved } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { useRouter } from "next/navigation";
type Props = {
  Message: Message;
};
function MessageActions({ Message }: Props) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id, readSolved }: MessageSolved) => {
      return await axios({
        url: `/api/admin/inbox/toggle`,
        method: `PATCH`,
        data: { id, readSolved },
      });
    },
    onSuccess: () => {
      toast.success(`Message Set to ${Message.readSolved ? "Unread" : "Read"}`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Error Updating Message`);
    },
  });
  return (
    <div className="flex items-center gap-3">
      <AiOutlineCheck
        onClick={() => {
          mutation.mutate({ id: Message.id, readSolved: Message.readSolved });
        }}
        className={`h-6 w-6 ${
          Message.readSolved ? "text-red-600" : "text-green-500"
        }`}
      />
    </div>
  );
}
export default MessageActions;
