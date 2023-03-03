import { useStore } from "@/components/useStore";
import pb from "@/lib/pocketbase";
import { FormEvent, InputHTMLAttributes, useRef, useState } from "react";
import { useForm } from "react-hook-form";
interface formData {
  image: FileList;
}
type Props = {};
function AvatarUpload({}: Props) {
  const [size, setSize] = useState(``);
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = async function (e: FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    /* @ts-expect-error */
    formData.append(`avatar`, fileRef.current?.files[0]);
    try {
      const data = await pb
        .collection(`users`)
        /* @ts-expect-error */
        // alway gonna be id if you are seeing this page
        .update(pb.authStore.model?.id, formData);
      /* @ts-expect-error */
      fileRef.current.value = "";
      useStore.setState({ count: Math.random() });
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>();
  const checkSize = function (e: any) {
    if (e.target.files[0].size > 2097152) {
      setSize("Size Limit is 2MB !");
      //   alert("File is too big!");
      e.target.value = "";
    } else {
      setSize("");
    }
  };
  return (
    <form onSubmit={submit} className="flex  gap-2 font-mono items-end">
      <div>
        {" "}
        <label htmlFor="image" className="label flex justify-start gap-2">
          <span className="label-text">Pick a file</span>
          {size ? (
            <span className="label-text text-red-800 font-extrabold uppercase">
              {size}
            </span>
          ) : null}
        </label>
        <input
          ref={fileRef}
          onChange={checkSize}
          id="image"
          type="file"
          className="file-input w-full max-w-xs"
          accept="image/*"
        />
      </div>
      <button className="btn">Change Avatar</button>
    </form>
  );
}
export default AvatarUpload;
