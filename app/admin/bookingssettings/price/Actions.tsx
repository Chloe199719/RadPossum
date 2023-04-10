import { SocialMediaShort } from "@/types";
import { SocialMedia, paypal_items } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { BsFillEraserFill, BsPencilFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";
import { HiBan } from "react-icons/hi";

type Props = {
  item: paypal_items;
  setEdit: Dispatch<SetStateAction<boolean>>;
};
function Actions({ item, setEdit }: Props) {
  return (
    <div className="flex gap-2">
      <BsPencilFill
        onClick={() => {
          setEdit(true);
        }}
        className="h-6 w-6 hover:text-slate-600 active:text-blue-600"
      />{" "}
    </div>
  );
}
export default Actions;
