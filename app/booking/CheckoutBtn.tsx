import pb from "@/lib/pocketbase";
import toast from "react-hot-toast";

type Props = {
  date: Date;
  selHour: string;
  productID: string;
  button_text: string;
};
function CheckoutBtn({ date, selHour, productID, button_text }: Props) {
  const onClick = async function () {
    try {
      const test = await fetch("/api/checkout_sessions", {
        method: `POST`,
        body: JSON.stringify({
          clientID: pb.authStore.model?.id,
          clientEmail: pb.authStore.model?.email,
          productID: productID,
          bookedHour: selHour,
          time: date,
        }),
      });
      if (!test.ok) {
        toast.error(`Error Try Again in a Few Minutes`);
        throw new Error(`Bad Request`);
      }
      const data = await test.json();
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      {pb.authStore.isValid ? (
        <button
          disabled={selHour === ""}
          className="py-4 px-10 rounded-xl bg-blue-400 hover:bg-blue-600 disabled:bg-red-200 flex-1"
          onClick={onClick}
        >
          {button_text}
        </button>
      ) : (
        <p className="text-red-400">Login</p>
      )}
    </>
  );
}
export default CheckoutBtn;
