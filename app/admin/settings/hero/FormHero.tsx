"use client";

import { FormHero } from "@/types";
import { hero } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  hero: hero;
};
function FormHero({ hero }: Props) {
  const router = useRouter();
  const [highLightText, setHighLightText] = useState(hero.higlightText);
  const [titleFirst, setTitleFirst] = useState(hero.titleFirst);
  const [titleSec, setTitleSec] = useState(hero.titleSec);
  const [mainText, setMainText] = useState(hero.mainText);
  const mutation = useMutation({
    mutationFn: async ({
      higlightText,
      titleFirst,
      titleSec,
      mainText,
    }: FormHero) => {
      return await axios({
        url: `/api/admin/settings/hero/update`,
        method: `PATCH`,
        data: { higlightText, titleFirst, titleSec, mainText },
      });
    },
    onSuccess: () => {
      toast.success(`Hero Updated`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Failed to Update Hero`);
    },
  });
  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({
            higlightText: highLightText,
            titleFirst,
            titleSec,
            mainText,
          });
        }}
        className="flex flex-col gap-4"
      >
        {" "}
        <div className="flex flex-col gap-2">
          <label
            className="label-text text-lg ml-2 text-blue-600 text-center"
            htmlFor="TitleFirst"
          >
            Title First
          </label>
          <input
            id="TitleFirst"
            className="input"
            type="text"
            value={titleFirst}
            onChange={(e) => {
              setTitleFirst(e.target.value);
            }}
          />
        </div>{" "}
        <div className="flex flex-col gap-2">
          <label
            className="label-text text-lg ml-2 text-blue-600 text-center"
            htmlFor="hightLightText"
          >
            HightLightText
          </label>
          <input
            id="hightLightText"
            className="input"
            type="text"
            value={highLightText}
            onChange={(e) => {
              setHighLightText(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="label-text text-lg ml-2 text-blue-600 text-center"
            htmlFor="mainText"
          >
            Second Title
          </label>
          <input
            id="mainText"
            className="input"
            type="text"
            value={mainText}
            onChange={(e) => {
              setMainText(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="label-text text-lg ml-2 text-blue-600 text-center"
            htmlFor="TitleSecond"
          >
            Main Text
          </label>
          <textarea
            id="TitleSecond"
            rows={5}
            className="textarea text-lg"
            value={titleSec}
            onChange={(e) => {
              setTitleSec(e.target.value);
            }}
          />
        </div>
        <button className="btn">Update </button>
      </form>
    </div>
  );
}
export default FormHero;
