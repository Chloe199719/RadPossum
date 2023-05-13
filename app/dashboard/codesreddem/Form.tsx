import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface formData {
  code: string;
  message: string;
}

type Props = {
  time: number;
};
function Form({ time }: Props) {
  const { register, handleSubmit, reset } = useForm<formData>();
  const { data: session, status } = useSession();
  const Submit: SubmitHandler<formData> = async function (data) {
    try {
      const test = await fetch("/api/code_booking", {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: time,

          message: data.message,
          code: data.code,
        }),
      });
      if (!test.ok) {
        const res = await test.json();
        throw new Error(res);
      }
      const res = await test.json();
      toast.success(res.message, { duration: 6000 });
      reset();
    } catch (error: any) {
      toast.error(error.message, { duration: 6000 });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className="flex flex-col items-center justify-center gap-2 w-full"
    >
      <div className="flex flex-col gap-2 w-full">
        <div>
          <label className="text-center" htmlFor="code">
            Your Code:
          </label>
          <input
            className="w-full input "
            id="code"
            type="text"
            required
            {...register("code")}
          />
        </div>{" "}
        <div>
          <label className="text-center" htmlFor="message">
            Message:
          </label>
          <input
            className="w-full input "
            id="message"
            type="text"
            {...register(`message`)}
          />
        </div>
      </div>
      <button className="btn w-full">Book</button>
    </form>
  );
}
export default Form;
