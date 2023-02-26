"use client";
import pb from "@/lib/pocketbase";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../contact/alert";

interface formData {
  userName: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type Props = {};
function Page({}: Props) {
  const [errorEmail, setErrorEmail] = useState(``);
  const [errorUserName, setErrorUserName] = useState(``);
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
    setErrorUserName(``);
    setPasswordError(``);
    setSuccess(``);
    if (data.password !== data.confirmPassword) {
      setPasswordError(`Passwords don't match`);
      setLoading(false);
      return;
    }
    try {
      const request = await pb.collection(`users`).create({
        username: data.userName,
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirmPassword,
        name: data.displayName,
      });
      setSuccess(`SuccessFully created your account`);
      reset();
    } catch (error: any) {
      // console.log(error.data.data.email.message);
      if (error.data.data.hasOwnProperty(`email`)) {
        setErrorEmail(error.data.data.email.message);
      }
      if (error.data.data.hasOwnProperty(`username`)) {
        setErrorUserName(error.data.data.username.message);
      }
      setError(`There was an Error Creating Your account`);
    }
    setLoading(false);
  };
  return (
    <section className="min-h-screen flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40 ">
      <div className="font-mono max-w-6xl  flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 md:w-1/2 ">
        <h2 className="text-6xl">Sign UP</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:w-full mx-auto w-full px-10 py-5"
        >
          <div className="flex flex-col gap-2">
            {" "}
            <label htmlFor="username">
              UserName<span className="text-red-600">*</span>{" "}
              {errorUserName ? (
                <span className="text-red-600">{errorUserName}</span>
              ) : null}
            </label>
            <input
              id="username"
              type="text"
              required
              {...register("userName")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              DisplayName<span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              {...register("displayName")}
            />{" "}
          </div>{" "}
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
              {...(register(`password`), { minLength: 8 })}
            />{" "}
          </div>{" "}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">
              Confirm PassWord<span className="text-red-600">*</span>{" "}
              {passwordError ? (
                <span className="text-red-600">{passwordError}</span>
              ) : null}
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              {...(register(`confirmPassword`), { minLength: 8 })}
            />{" "}
          </div>{" "}
          {error ? <Alert color="red" message={error} func={setError} /> : null}
          {success ? (
            <Alert color="green" message={success} func={setSuccess} />
          ) : null}
          <button
            disabled={loading}
            className="bg-[#30bead] mt-2 p-4 rounded-lg"
          >
            Sign UP{" "}
            {loading ? <Spinner color="info" aria-label="Loading" /> : null}
          </button>
        </form>
        <div className="flex flex-1 w-full px-10">
          <Link className="w-full" href="/login">
            <button className="bg-[#30bead] mt-2 p-4 w-full  rounded-lg">
              Already have Account? Login instead
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Page;
