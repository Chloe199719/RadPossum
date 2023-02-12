"use client";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};
function Page({}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const test = async function () {
    try {
      const res = await fetch(`/api/postSignUP`, {
        method: "POST",
        body: JSON.stringify({ name: `chloe` }),
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className="min-h-screen flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40 ">
      <div className="font-mono max-w-6xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200">
        <h2>Sign UP</h2>
        <form>
          <label htmlFor="username">UserName</label>
          <input id="username" type="text" required />
          <label htmlFor="name">DisplayName</label>
          <input id="name" type="text" required />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />
          <label htmlFor="confirmPassword">Confirm PassWord</label>
          <input id="confirmPassword" type="password" required />
          <button type="button" onClick={test}>
            Sign UP
          </button>
        </form>
      </div>
    </section>
  );
}
export default Page;
