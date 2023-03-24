"use client";
import { Booking, SendMessage } from "@/types";
import axios from "axios";
import { useForm } from "react-hook-form";

type Props = {
  bookingData: Booking | null | undefined;
};
function Form({ bookingData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMessage>();

  async function onSubmit(data: SendMessage) {
    try {
      const res = await axios({
        url: `/api/admin/upcomingbookings/sendMessage`,
        method: `post`,
        data: {
          subject: data.subject,
          message: data.message,
          email: bookingData?.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="w-full">
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-center" htmlFor="subject">
            Subject
          </label>
          <input type="text" id="subject" required {...register(`subject`)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-center" htmlFor="message">
            Message
          </label>
          <textarea
            className=""
            id="message"
            required
            {...register(`message`)}
          />
        </div>
        <button className="btn">Send Message</button>
      </form>
    </div>
  );
}
export default Form;
