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
  const [temrs, setTerms] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
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
    try {
      const res = await fetch(`/api/createPayPalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          item: getProdID(),
          time: time,
          offset: new Date().getTimezoneOffset(),
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
    try {
      const res = await fetch(`/api/capturePaypalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          orderID: orderID,
          time: time,
          offset: new Date().getTimezoneOffset(),
          message: messageRef.current?.value,
        }),
      });
      const data = await res.json();
      return data.id;
    } catch (error: any) {
      return Promise.reject(`Error`);
    }
  };
  return (
    <form className="flex flex-col gap-4 w-full max-w-[750px] ">
      <div className="flex flex-col gap-2 w-full">
        <textarea id="message" placeholder="Message" ref={messageRef} />
      </div>
      <div className="flex items-center gap-2">
        <input
          checked={temrs}
          onChange={() => {
            setTerms(!temrs);
          }}
          type="checkbox"
        />{" "}
        <span>
          Accept{" "}
          <label htmlFor="my-modal-4" className="text-blue-600 underline">
            {" "}
            Terms of Service{" "}
          </label>
        </span>
      </div>
      <PayPalButtons
        className="w-full flex justify-center"
        onError={(e) => {
          toast.error(`error ${e.message}`);
        }}
        disabled={time === 0 || !temrs}
        forceReRender={[time, temrs]}
        fundingSource="paypal"
        style={{ shape: `pill`, label: `buynow`, height: 55 }}
        createOrder={createOrder}
        onApprove={(data, actions) => {
          toast.success(`Your Order is Complete `);
          router.push(`/`);
          return onApprove(data.orderID);
        }}
      />
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Terms of Service</h3>
          <p className="py-4">
            You ve been selected for a chance to get one year of subscription to
            use Wikipedia for free! (placeholder)
          </p>
          <p className="py-4">
            You ve been selected for a chance to get one year of subscription to
            use Wikipedia for free! (placeholder)
          </p>
          <p className="py-4">
            You ve been selected for a chance to get one year of subscription to
            use Wikipedia for free! (placeholder)
          </p>
        </label>
      </label>
    </form>
  );
}
export default PaypalBtn;
