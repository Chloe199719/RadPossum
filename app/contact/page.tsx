"use client";

import axios from "axios";
import { Spinner, Toast } from "flowbite-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "./alert";
// Type For form data
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
  subject: string;
}

type Props = {};
{
  /* TODO ADDED USER INPUT ERROR */
}
function Page({}: Props) {
  const [error, setError] = useState(``);
  const [success, setSuccess] = useState(``);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<formData>();

  // Submits Data to the Server
  const onSubmit: SubmitHandler<formData> = async function (data) {
    setLoading(true);
    setError(``);
    setSuccess(``);
    try {
      const res = await axios({
        method: `post`,
        url: `/api/contact/postMessage`,
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          discordID: data.discordID,
          pronouns: checkPronouns(data),
          message: data.message,
          readSolved: false,
        },
      });
      setSuccess(res.data.message);
      reset();
    } catch (error: any) {
      setError(`There was a Error Sending Your message Try again`);
    }
    setLoading(false);
  };

  // Checks Pronouns selected and makes a String
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
      <div className="font-mono max-w-6xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-4 md:p-12 bg-zinc-200">
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
          className="flex flex-col form-control items-center justify-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-3 flex-col md:flex-row">
            <div className="flex flex-col">
              <label htmlFor="name" className="">
                <span className=" label-text">Name</span>
                <span className="text-red-600 label-text">*</span>
              </label>
              <input
                id="name"
                className="input border-transparent focus:border-transparent focus:ring-0 focus:outline-primary"
                placeholder="Ex: Chloe"
                type="text"
                {...register("name")}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">
                <span className=" label-text">Email</span>{" "}
                <span className="label-text text-red-600">*</span>
              </label>
              <input
                type="email"
                className="input border-transparent focus:border-transparent focus:ring-0 focus:outline-primary"
                placeholder="Ex: chloe@chloevison.com"
                {...register("email")}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">
                <span className=" label-text"> Discord ID</span>
                <span className="text-red-600 label-text">*</span>
              </label>
              <input
                type="text"
                className="input border-transparent focus:border-transparent focus:ring-0 focus:outline-primary"
                placeholder="Ex: Chloe#1231"
                {...register("discordID")}
                required
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              <label htmlFor="subject">
                <span className=" label-text">Subject</span>{" "}
                <span className="text-red-600 label-text">*</span>
              </label>
              <input
                id="subject"
                type="text"
                className="input border-transparent focus:border-transparent focus:ring-0 focus:outline-primary"
                placeholder="Ex: I have a question"
                {...register("subject")}
                required
              />
            </div>
          </div>
          <div className="flex md:flex gap-3 w-full items-start md:items-center justify-start md:justify-center flex-col md:flex-row">
            <div className="flex  gap-3 items-center">
              {" "}
              <input
                className="checkbox-primary checkbox"
                id="she/her"
                type="checkbox"
                value="She/Her"
                {...register("SheHer")}
              />
              <label htmlFor="she/her">
                <span className="label-text">She/Her</span>
              </label>{" "}
            </div>
            <div className="flex gap-3 items-center">
              <input
                className="checkbox-primary checkbox"
                id="he/him"
                value="He/Him"
                type="checkbox"
                {...register("HeHim")}
              />
              <label htmlFor="he/him">
                {" "}
                <span className="label-text">He/Him</span>
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <input
                className="checkbox-primary checkbox"
                id="they/them"
                value="They/Them"
                type="checkbox"
                {...register("TheyThem")}
              />
              <label htmlFor="they/them">
                {" "}
                <span className="label-text">They/them</span>
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <input
                className="checkbox-primary checkbox"
                id="other"
                type="checkbox"
                {...register("other")}
              />
              <label htmlFor="other">
                {" "}
                <span className="label-text">Other</span>
              </label>
            </div>
            <input
              placeholder="If you selected other drop you prefrences here"
              className="input border-transparent focus:border-transparent focus:ring-0 focus:outline-primary flex-1"
              type="text"
              {...register("otherInput")}
            />
          </div>
          <label htmlFor="message">
            {" "}
            <span className="label-text">Message</span>
          </label>
          <textarea
            placeholder="Message that u wanna send"
            className="textarea border-transparent focus:border-transparent focus:ring-0 focus:outline-primary w-full "
            id="message"
            {...register("message")}
            required
          />
          <button
            disabled={loading}
            className=" btn btn-primary w-full py-2 mt-3 px-10  text-white uppercase text-2xl rounded-lg"
          >
            Submit{" "}
            {loading ? <Spinner color="info" aria-label="Loading" /> : null}
          </button>
          {error ? <Alert color="red" message={error} func={setError} /> : null}
          {success ? (
            <Alert color="green" message={success} func={setSuccess} />
          ) : null}
        </form>
      </div>
    </main>
  );
}
export default Page;
