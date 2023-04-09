import { FormSocialCreate } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {
  setCreate: Dispatch<SetStateAction<boolean>>;
};
function CreateForm({ setCreate }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSocialCreate>();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: FormSocialCreate) => {
      return await axios({
        url: `/api/admin/settings/socialmedia/create`,
        method: `POST`,
        data: {
          name: data.name,
          socialmedia_url: data.socialmedia_url,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Created New Social Media`);
      setCreate(false);
      router.refresh();
    },
    onError: () => {
      toast.error(`Failed to Create New Social Media`);
    },
  });
  const onSubmit: SubmitHandler<FormSocialCreate> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="border-2 rounded-lg border-black grid grid-cols-3 px-4 py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="editSocial"
        className="col-span-2 grid grid-cols-2 gap-2"
      >
        <div className="flex flex-col gap-2">
          <label className="label-text ml-3" htmlFor="name">
            Social Name
          </label>
          <input className="input" type="text" {...register("name")} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label-text ml-3" htmlFor="name">
            Social URL
          </label>
          <input
            className="input"
            type="text"
            {...register("socialmedia_url")}
          />
        </div>
      </form>
      <span className=" justify-self-end flex items-center gap-2">
        <button
          form="editSocial"
          type="submit"
          className="disabled:bg-slate-500"
        >
          <GiConfirmed
            onClick={() => {}}
            className="h-6 w-6 text-green-500 hover:text-green-400 active:text-green-800"
          />
        </button>
        <HiBan
          onClick={() => {
            setCreate(false);
          }}
          className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800"
        />
      </span>
    </div>
  );
}
export default CreateForm;
