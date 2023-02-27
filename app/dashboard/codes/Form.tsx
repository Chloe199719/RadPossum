import pb from "@/lib/pocketbase";
import { SubmitHandler, useForm } from "react-hook-form";
import { json } from "stream/consumers";

interface formData {
  code: string;
  discordID: string;
  message: string;
}

type Props = {
  date: Date;
  selHour: string;
};
function Form({ date, selHour }: Props) {
  const { register, handleSubmit, reset } = useForm<formData>();
  const Submit: SubmitHandler<formData> = async function (data) {
    try {
      const test = await fetch("/api/code_booking", {
        method: `POST`,
        body: JSON.stringify({
          clientID: pb.authStore.model?.id,
          clientEmail: pb.authStore.model?.email,
          bookedHour: selHour,
          time: date,
          discordID: data.discordID, // test data
          message: data.message, //test data
          code: data.code, // test date
        }),
      });
      const res = await test.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className="flex flex-col items-center justify-center gap-2"
    >
      <div className="flex gap-2">
        <div>
          <label htmlFor="code">Your Code:</label>
          <input id="code" type="text" required {...register("code")} />
        </div>{" "}
        <div>
          <label htmlFor="discordID">DiscordID:</label>
          <input
            id="discordID"
            type="text"
            required
            {...register(`discordID`)}
          />
        </div>{" "}
        <div>
          <label htmlFor="message">Message:</label>
          <input id="message" type="text" {...register(`message`)} />
        </div>
      </div>
      <button className=" bg-blue-600 px-6 py-2 rounded-sm">Book</button>
    </form>
  );
}
export default Form;
