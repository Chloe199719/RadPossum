import pb from "@/lib/pocketbase";
import { RefObject } from "react";
import toast from "react-hot-toast";

type Props = {
  date: Date;
  selHour: string;
  btnData: {
    id: string;
    productID: string;
    button_text: string;
    privacy: string;
    duration: string;
  }[];
  privacy: RefObject<HTMLSelectElement>;
  duration: RefObject<HTMLSelectElement>;
};

function CheckoutBtn({ date, selHour, btnData, privacy, duration }: Props) {
  const getProdID = function () {
    let id = "";
    btnData.forEach((e) => {
      if (
        e.duration === duration.current?.value &&
        e.privacy === privacy.current?.value
      ) {
        id = e.productID;
      }
    });

    return id;
  };
  const onClick = async function () {
    try {
      const test = await fetch("/api/checkout_sessions", {
        method: `POST`,
        body: JSON.stringify({
          clientID: pb.authStore.model?.id,
          clientEmail: pb.authStore.model?.email,
          productID: getProdID(),
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
          Stripes
        </button>
      ) : (
        <p className="text-red-400">Login</p>
      )}
    </>
  );
}
export default CheckoutBtn;
