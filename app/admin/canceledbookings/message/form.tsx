"use client";
import { Booking, SendMessage } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useState } from "react";

type Props = {
  bookingData: Booking | null | undefined;
};
function Form({ bookingData }: Props) {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessage>();

  const mutation = useMutation({
    mutationFn: (data: SendMessage) => {
      return axios({
        url: `/api/admin/upcomingbookings/sendMessage`,
        method: `post`,
        data: {
          subject: data.subject,
          message: data.message,
          email: bookingData?.email,
        },
      });
    },
    onSuccess: () => {
      toast.success(`Message sent to ${bookingData?.User.name}`);
      router.push(`/admin/upcomingbookings`);
      reset();
    },
    onError: () => {
      toast.error(`Error sending message to ${bookingData?.User.name}`);
    },
  });

  const onSubmit: SubmitHandler<SendMessage> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div onSubmit={handleSubmit(onSubmit)} className="w-full mt-3">
      <form className="form-control  gap-3">
        <div className="flex flex-col gap-1">
          <label className="label text-center" htmlFor="subject">
            Subject
          </label>
          <input
            className="input"
            type="text"
            id="subject"
            required
            {...register(`subject`)}
            placeholder="Subject"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-center" htmlFor="message">
            Message
          </label>
          <textarea
            className="textarea"
            id="message"
            required
            rows={5}
            placeholder="Message"
            {...register(`message`)}
          />
          {/* <SimpleMDE
            value={message}
            onChange={(e) => {
              setMessage(e);
            }}
          /> */}
        </div>
        <button className="btn" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
export default Form;
