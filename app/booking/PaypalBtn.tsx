"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { RefObject, useRef, useState } from "react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { paypal_items } from "@prisma/client";
type Props = {
  time: number;
  paypalID: paypal_items[] | undefined;
  privacyCur: RefObject<HTMLSelectElement>;
  durationCur: RefObject<HTMLSelectElement>;
};

function PaypalBtn({ time, paypalID, privacyCur, durationCur }: Props) {
  const discordIDRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [discordID, setDiscordID] = useState(``);
  const router = useRouter();
  const getProdID = function () {
    let id = "";
    paypalID?.forEach((e) => {
      if (
        e.duration === durationCur.current?.value &&
        e.privacy === privacyCur.current?.value
      ) {
        id = e.id;
      }
    });
    return id;
  };
  const createOrder = async function () {
    if (!discordIDRef.current?.value.trim()) {
      return Promise.reject(`Fill Discord ID`);
    }

    try {
      const res = await fetch(`/api/createPayPalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          item: getProdID(),
          time: time,
          offset: new Date().getTimezoneOffset(),
          discordID: discordIDRef.current.value,
          message: messageRef.current?.value,
        }),
      });
      const data = await res.json();
      return data.id;
    } catch (error: any) {
      return Promise.reject(`Error`);
    }
  };

  const onApprove = async function (orderID: string) {
    if (!discordIDRef.current?.value.trim()) {
      toast.error(`Fill Discord ID and try again u didn't get charged`);
      return;
    }
    try {
      const res = await fetch(`/api/capturePaypalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          orderID: orderID,
          time: time,
          offset: new Date().getTimezoneOffset(),
          discordID: discordIDRef.current.value,
          message: messageRef.current?.value,
        }),
      });
      const data = await res.json();
      return data.id;
    } catch (error: any) {
      return Promise.reject(`Error`);
    }
  };
  const check = function () {
    if (time && discordID.trim()) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 w-96">
        <div
          className="flex flex-col
        "
        >
          <label htmlFor="discordID" className="label text-red-600">
            Required*
          </label>
          <input
            className="input"
            type="text"
            value={discordID}
            onChange={(e) => {
              setDiscordID(e.target.value);
            }}
            id="discordID"
            ref={discordIDRef}
            placeholder="Discord ID"
            required
          />
        </div>
        <textarea id="message" placeholder="Message" ref={messageRef} />
      </div>
      <PayPalButtons
        onError={(e) => {
          toast.error(`error ${e.message}`);
        }}
        disabled={check()}
        forceReRender={[time, discordID]}
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
