import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/useStore";
import toast from "react-hot-toast";
import { useState } from "react";

interface formData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

type Props = {};
function ChangePassword({}: Props) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<formData>();
  const [loading, setLoading] = useState(false);
  // const newPostMutattion = useMutation({
  //   mutationFn: (data: formData) => {
  //     return pb.collection(`users`).update(pb.authStore.model?.id, {
  //       password: data.newPassword,
  //       passwordConfirm: data.confirmNewPassword,
  //       oldPassword: data.oldPassword,
  //     });
  //   },
  // });

  const onSubmit = async (data: formData) => {
    if (
      data.oldPassword === "" ||
      data.confirmNewPassword === "" ||
      data.newPassword === ""
    ) {
      toast.error(`Fill all the fields to change password`);
      return;
    }
    if (data.confirmNewPassword !== data.newPassword) {
      toast.error(`New passwords dont match`);
      reset();
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      await pb.collection(`users`).update(pb.authStore.model?.id, {
        password: data.newPassword,
        passwordConfirm: data.confirmNewPassword,
        oldPassword: data.oldPassword,
      });
      pb.authStore.clear();
      toast.success("Password Change Login Again Pls");
      useStore.setState({ count: Math.random() });
      router.push(`/login`);
    } catch (error: any) {
      toast.error("There was a Error Changing your Password");
      reset();
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center mx-auto gap-4">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="curPassword">Current Password</label>
          <input
            type="password"
            id="curPassword"
            {...register(`oldPassword`)}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="newPassword">New password</label>
          <input
            type="password"
            id="newPassword"
            {...register(`newPassword`)}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="repeatNewPassword">Repeat password</label>
          <input
            type="password"
            id="repeatNewPassword"
            {...register(`confirmNewPassword`)}
          />
        </div>
      </div>
      <button
        className="w-full py-2 mt-3 px-10 bg-[#30bead] uppercase text-2xl rounded-lg disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        Change Password
      </button>
    </form>
  );
}
export default ChangePassword;
