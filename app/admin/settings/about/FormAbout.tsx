"use client";

import { FormAbout } from "@/types";
import { Aboutme } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  about: Aboutme[];
};
function FormAbout({ about }: Props) {
  const [about0, setAbout0] = useState(about[0].desc);
  const [about1, setAbout1] = useState(about[1].desc);
  const mutation = useMutation({
    mutationFn: async ({ id0, id1, about0, about1 }: FormAbout) => {
      return await axios({
        url: `/api/admin/settings/about/update`,
        method: `PATCH`,
        data: { id0, id1, about0, about1 },
      });
    },
    onSuccess: () => {
      toast.success(`About Updated`);
    },
    onError: () => {
      toast.error(`Failed to Update About Me`);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ id0: about[0].id, about0, id1: about[1].id, about1 });
      }}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex flex-col gap-2">
        <label
          className="label-text text-lg ml-2 text-blue-600 text-center"
          htmlFor="firstParagraph"
        >
          First Paragraph
        </label>
        <textarea
          rows={5}
          className="textarea text-lg"
          id="firstParag"
          value={about0}
          onChange={(e) => {
            setAbout0(e.target.value);
          }}
        />
      </div>{" "}
      <div className="flex flex-col gap-2">
        <label
          className="label-text text-lg ml-2 text-blue-600 text-center"
          htmlFor="secondParagraph"
        >
          Second Paragraph
        </label>
        <textarea
          rows={5}
          className="textarea text-lg"
          id="secondParagraph"
          value={about1}
          onChange={(e) => {
            setAbout1(e.target.value);
          }}
        />
      </div>{" "}
      <button className="btn">Update</button>
    </form>
  );
}
export default FormAbout;
