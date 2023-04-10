import { FormPrice } from "@/types";
import { paypal_items } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {
  item: paypal_items;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

function Form({ item, setEdit }: Props) {
  const [price_saturday, setPrice_saturday] = useState(
    parseInt(item.price_saturday)
  );
  const [price_standard, setPrice_standard] = useState(
    parseInt(item.price_standard)
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id, price_saturday, price_standard }: FormPrice) => {
      return await axios({
        url: `/api/admin/bookingssettings/price/update`,
        method: `PATCH`,
        data: {
          id,
          price_saturday,
          price_standard,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Updated @${item.title}`);
      router.refresh();
      setEdit(false);
    },
    onError: () => {
      toast.error(`Failed to Update @${item.title}`);
    },
  });
  const onSubmit: SubmitHandler<any> = () => {
    mutation.mutate({
      id: item.id,
      price_saturday: price_saturday.toString(),
      price_standard: price_standard.toString(),
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-3 w-full col-span-3 gap-1"
    >
      <div className="flex  input-group">
        {/* <label htmlFor="stdPrice">Standard Price</label> */}
        <input
          className="input"
          onChange={(e) => {
            setPrice_standard(parseInt(e.target.value));
          }}
          value={price_standard}
          id="stdPrice"
          type="number"
        />
        <span className="bg-gray-400 px-4">$</span>
      </div>
      <div className="flex  input-group">
        {/* <label htmlFor="satPrice">Saturday Price</label> */}
        <input
          className="input"
          onChange={(e) => {
            setPrice_saturday(parseInt(e.target.value));
          }}
          value={price_saturday}
          id="satPrice"
          type="number"
        />
        <span className="bg-gray-400 px-4">$</span>
      </div>
      <span className=" justify-self-end flex items-center gap-2">
        <button type="submit" className="disabled:bg-slate-500">
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
    </form>
  );
}

export default Form;
