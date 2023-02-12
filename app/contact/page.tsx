"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface formData {
  HeHim: Boolean;
  SheHer: boolean;
  TheyThem: boolean;
  discordID: string;
  email: string;
  name: string;
  other: boolean;
  otherInput: string;
  message: string;
}

type Props = {};

function Page({}: Props) {
  const [error, setError] = useState(``);
  const [success, setSuccess] = useState(``);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<formData>();
  const onSubmit: SubmitHandler<formData> = function (data) {
    console.log(data);
    console.log(checkPronouns(data));
  };

  const checkPronouns = function (data: formData) {
    let pronouns = "";
    if (data.SheHer) {
      pronouns = pronouns + "She/Her";
    }
    if (data.HeHim) {
      if (pronouns) {
        pronouns = pronouns + " / He/Him";
      } else {
        pronouns = pronouns + "He/Him";
      }
    }
    if (data.TheyThem) {
      if (pronouns) {
        pronouns = pronouns + " / They/Them";
      } else {
        pronouns = pronouns + "They/Them";
      }
    }
    if (data.other) {
      if (pronouns) {
        pronouns = pronouns + ` / ${data.otherInput}`;
      } else {
        pronouns = pronouns + `${data.otherInput} `;
      }
    }
    return pronouns;
  };
  return (
    <main className="min-h-screen flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-6xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200">
        <h2 className="text-4xl">Contact Me</h2>
        <div className="flex flex-col items-center justify-center text-center">
          {/* Small Text */}
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
            pariatur illum asperiores quia blanditiis est accusamus minima,
            rerum modi? Labore ut eveniet laudantium harum incidunt obcaecati,
            hic officiis quae magnam!
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-3 flex-col md:flex-row">
            <div className="flex flex-col">
              <label htmlFor="name">
                Name<span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                placeholder="Ex: Chloe"
                type="text"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                placeholder="Ex: chloe@chloevison.com"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">
                Discord ID<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Chloe#1231"
                {...register("discordID")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:flex gap-3 w-full items-center justify-center flex-col md:flex-row">
            <div className="flex gap-3">
              {" "}
              <input
                id="she/her"
                type="checkbox"
                value="She/Her"
                {...register("SheHer")}
              />
              <label htmlFor="she/her">She/Her</label>{" "}
            </div>
            <div className="flex gap-3">
              <input
                id="he/him"
                value="He/Him"
                type="checkbox"
                {...register("HeHim")}
              />
              <label htmlFor="he/him">He/Him</label>
            </div>
            <div className="flex gap-3">
              <input
                id="they/them"
                value="They/Them"
                type="checkbox"
                {...register("TheyThem")}
              />
              <label htmlFor="they/them">They/them</label>
            </div>
            <div className="flex gap-3">
              <input id="other" type="checkbox" {...register("other")} />
              <label htmlFor="other">Other</label>
            </div>
            <input
              placeholder="If you selected other drop you prefrences here"
              className="flex-1 col-span-2"
              type="text"
              {...register("otherInput")}
            />
          </div>
          <label htmlFor="message">Message</label>
          <textarea
            placeholder="Message that u wanna send"
            className=" w-full"
            id="message"
            {...register("message")}
          />
          <button className="w-full py-2 mt-3 px-10 bg-[#30bead] uppercase text-2xl rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
export default Page;
