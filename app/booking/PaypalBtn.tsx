import pb from "@/lib/pocketbase";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { rejects } from "assert";
import { InputHTMLAttributes, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  date: Date;
  selHour: string;
  paypalID: {
    id: string;
    private_id: string;
    title: string;
    privacy: string;
    duration: string;
  }[];
  privacyCur: string;
  durationCur: string;
};

function PaypalBtn({
  date,
  selHour,
  paypalID,
  privacyCur,
  durationCur,
}: Props) {
  const discordIDRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const getProdID = function (dur: string, priv: string) {
    let id = "";
    paypalID.forEach((e) => {
      if (e.duration === dur && e.privacy === priv) {
        id = e.private_id;
      }
    });
    return id;
  };
  const createOrder = async function () {
    if (!discordIDRef.current?.value) {
      return Promise.reject(`Fill Discord ID`);
    }
    try {
      const res = await fetch(`/api/createPayPalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          item: getProdID(durationCur, privacyCur),
          date: date,
          selHour: selHour,
          discordID: discordIDRef.current.value,
          message: messageRef.current?.value,
        }),
      });
      const data = await res.json();
      return data.id;
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const onApprove = async function (orderID: string) {
    if (!discordIDRef.current?.value) {
      toast.error(`Fill Discord ID and try again u didn't get charged`);
      return;
    }
    try {
      const res = await fetch(`/api/capturePaypalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          orderID: orderID,
          date: date,
          selHour: selHour,
          discordID: discordIDRef.current.value,
          message: messageRef.current?.value,
          client: pb.authStore.model?.id,
        }),
      });
      const data = await res.json();
      return data.id;
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  return (
    <form className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          ref={discordIDRef}
          id="discordID"
          placeholder="Discord ID"
          required
        />
        <input
          id="message"
          placeholder="Message"
          type="text"
          ref={messageRef}
        />
      </div>
      <PayPalButtons
        onError={(e) => {
          /* @ts-expect-error */
          toast.error(e);
        }}
        fundingSource="paypal"
        style={{ shape: `pill`, label: `buynow`, height: 55 }}
        createOrder={createOrder}
        onApprove={(data, actions) => {
          toast.success(`Your Order is Complete `);
          router.push(`/`);
          return onApprove(data.orderID);
        }}
      />
    </form>
  );
}
export default PaypalBtn;
