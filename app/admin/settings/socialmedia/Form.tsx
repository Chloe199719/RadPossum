import { FormSocial, FormSocialEdit } from "@/types";
import { SocialMedia } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {
  item: SocialMedia;
  setEdit: Dispatch<SetStateAction<boolean>>;
};
function Form({ item, setEdit }: Props) {
  const [name, setName] = useState(item.name);
  const [socialmedia_url, setSocialmedia_url] = useState(item.socialmedia_url);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSocial>();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id, name, socialmedia_url }: FormSocialEdit) => {
      return await axios({
        url: `/api/admin/settings/socialmedia/edit`,
        method: `PATCH`,
        data: {
          id,
          name,
          socialmedia_url,
        },
      });
    },
    onSuccess: () => {
      toast.success(`@${item.name} Updated`);
      router.refresh();
      setEdit(false);
    },
    onError: () => {
      toast.error(`Failed to Update @${item.name}`);
    },
  });
  const onSubmit: SubmitHandler<FormSocial> = (data) => {
    mutation.mutate({ id: item.id, name, socialmedia_url });
  };
  return (
    <div className="border-2 rounded-lg border-black grid grid-cols-3 px-4 py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="editSocial"
        className="col-span-2 grid grid-cols-2 gap-2"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          value={socialmedia_url}
          onChange={(e) => {
            setSocialmedia_url(e.target.value);
          }}
        />
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
            setEdit(false);
          }}
          className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800"
        />
      </span>
    </div>
  );
}
export default Form;
