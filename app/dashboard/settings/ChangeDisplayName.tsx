import { useStore } from "@/components/useStore";
import pb from "@/lib/pocketbase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface formData {
  name: string;
}

type Props = {};
function ChangeDisplayName({}: Props) {
  const { register, handleSubmit, reset } = useForm<formData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: formData) => {
    setLoading(true);
    try {
      // @ts-ignore
      await pb.collection(`users`).update(pb.authStore.model?.id, {
        name: data.name,
      });
      useStore.setState({ count: Math.random() });
      toast.success("Your name was changed!");
    } catch (error: any) {
      console.log(error);
      toast.error("There was a Error Changing your Name");
      reset();
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 font-mono"
    >
      <div className="flex  items-end justify-center mx-auto gap-4 my-2">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="displayName">New display name</label>
          <input type="text" id="displayName" {...register(`name`)} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="newPassword">Password</label>
          <input type="password" id="newPassword" />
        </div>{" "}
        <button
          className="w-full py-2 mt-3 px-10 bg-[#30bead] uppercase text-2xl rounded-lg"
          type="submit"
        >
          Change Name
        </button>
      </div>
    </form>
  );
}
export default ChangeDisplayName;
