"use client";
import { useStore } from "@/components/useStore";
import pb from "@/lib/pocketbase";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../contact/alert";

interface formData {
  email: string;
  password: string;
}

type Props = {};
function Page({}: Props) {
  const [errorEmail, setErrorEmail] = useState(``);
  const { count } = useStore();
  const [passwordError, setPasswordError] = useState(``);
  const [error, setError] = useState(``);
  const [success, setSuccess] = useState(``);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = async function (data: formData) {
    setLoading(true);
    setErrorEmail(``);
    setError(``);

    setPasswordError(``);
    setSuccess(``);
    try {
      const request = await pb
        .collection(`users`)
        .authWithPassword(data.email, data.password);
      console.log(pb.authStore);
      useStore.setState({ count: Math.random() });
    } catch (error: any) {
      console.log(error.data);
    }
    setLoading(false);
  };
  console.log(pb.authStore.model?.name);
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
              {errorEmail ? (
                <span className="text-red-600">{errorEmail}</span>
              ) : null}
            </label>
            <input id="email" type="email" required {...register("email")} />{" "}
          </div>{" "}
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Password<span className="text-red-600">*</span>{" "}
              {passwordError ? (
                <span className="text-red-600">{passwordError}</span>
              ) : null}
            </label>
            <input
              id="password"
              type="password"
              required
              {...register(`password`)}
            />
          </div>
          {error ? <Alert color="red" message={error} func={setError} /> : null}
          {success ? (
            <Alert color="green" message={success} func={setSuccess} />
          ) : null}
          <button
            disabled={loading}
            className="bg-[#30bead] mt-2 p-4 rounded-lg"
          >
            Login{" "}
            {loading ? <Spinner color="info" aria-label="Loading" /> : null}
          </button>
        </form>
        <div className="flex flex-1 w-full px-10">
          <Link className="w-full" href="/signup">
            <button className="bg-[#30bead] mt-2 p-4 w-full  rounded-lg">
              Dont have an account already? Signup Instead!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Page;
