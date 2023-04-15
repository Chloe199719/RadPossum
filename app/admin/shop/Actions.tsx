"use client";
import { paypal_items, shop } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFillEraserFill, BsPencilFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {
  shop: shop;
};

function Actions({ shop }: Props) {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await axios({
        url: `/api/admin/shop/delete?id=${id}`,
        method: `DELETE`,
      });
    },
    onSuccess: () => {
      toast.success(`@${shop.title} Delete`);
      router.refresh();
      setConfirm(false);
    },
    onError: () => {
      toast.error(`Failed to Delete @${shop.title}`);
    },
  });
  return (
    <div className="flex gap-2 w-full justify-center items-center">
      {" "}
      <Link href={`/admin/shop/edit/${shop.id}`}>
        {" "}
        <BsPencilFill className="h-6 w-6 hover:text-slate-600 active:text-blue-600" />
      </Link>
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
            className="disabled:bg-slate-500"
            disabled={mutation.isLoading}
            onClick={() => {
              mutation.mutate({ id: shop.id });
            }}
          >
            <GiConfirmed className="h-6 w-6 text-green-500 hover:text-green-400 active:text-green-800" />
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
