"use client";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import pb from "@/lib/pocketbase";
import Alert from "../contact/alert";
interface formData {
  email: string;
}
type Props = {};
function Page({}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(``);
  const router = useRouter();
  const onSubmit = async function (data: formData) {
    setLoading(true);

    try {
      const request = await pb
        .collection("users")
        .requestPasswordReset(data.email);
      if (request) {
        setSuccess(
          `If this email exists in our Database you will receive an email`
        );
        reset();
      }
    } catch (error: any) {}
    setLoading(false);
  };
  return (
    <section className="min-h-screen flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40 ">
      <div className="font-mono max-w-6xl  flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 md:w-1/2 ">
        <h2 className="text-6xl">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:w-full mx-auto w-full px-10 py-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email<span className="text-red-600">*</span>{" "}
            </label>
            <input id="email" type="email" required {...register("email")} />{" "}
          </div>{" "}
          <button
            disabled={loading}
            className="bg-[#30bead] mt-2 p-4 rounded-lg"
          >
            Reset Password{" "}
            {loading ? <Spinner color="info" aria-label="Loading" /> : null}
          </button>
        </form>
        {success ? (
          <Alert color="green" message={success} func={setSuccess} />
        ) : null}
      </div>
    </section>
  );
}
export default Page;
