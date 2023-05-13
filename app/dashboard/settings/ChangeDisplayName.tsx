"use client";
import { useStore } from "@/components/useStore";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const onSubmit = async (data: formData) => {
    setLoading(true);
    try {
      await axios({
        method: `put`,
        url: `/api/user/changename`,
        data: {
          name: data.name,
        },
      });
      useStore.setState({ count: Math.random() });
      toast.success("Your name was changed!");
      router.refresh();
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
