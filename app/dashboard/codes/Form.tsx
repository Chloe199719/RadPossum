import pb from "@/lib/pocketbase";
import { json } from "stream/consumers";

pb;
type Props = {
  date: Date;
  selHour: string;
};
function Form({ date, selHour }: Props) {
  const Submit = async function (e: React.FormEvent) {
    e.preventDefault();
    try {
      const test = await fetch("/api/code_booking", {
        method: `POST`,
        body: JSON.stringify({
          clientID: pb.authStore.model?.id,
          clientEmail: pb.authStore.model?.email,
          bookedHour: selHour,
          time: date,
          discordID: `Chloe🌸#9917`, // test data
          message: `TEST`, //test data
          code: `y38aywfYdu9Y0nDRXpx5FdcsQU-nC7`, // test date
        }),
      });
      const res = await test.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={Submit} className="flex items-center justify-center gap-2">
      <label htmlFor="code">Your Code:</label>

      <input type="text" required />

      <button>Book</button>
    </form>
  );
}
export default Form;
