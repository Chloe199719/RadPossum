"use client";
import { Booking, SendMessage } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {
  bookingData: Booking | null | undefined;
};
function Form({ bookingData }: Props) {
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
        <button className="btn" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
export default Form;
