"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { shop } from "@prisma/client";
import { RefObject } from "react";
import { toast } from "react-hot-toast";

type Props = {
  value: RefObject<HTMLInputElement>;
  card: shop;
};

function PaypalBtn({ value, card }: Props) {
  const createOrder = async function () {
    try {
      const res = await fetch(`/api/codes/createPayPalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          amount: value.current?.value,
          id: card.id,
        }),
      });
      const data = await res.json();
      return data.id;
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const onApprove = async function (orderID: string) {
    try {
      const res = await fetch(`/api/codes/capturePaypalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          orderID: orderID,
        }),
      });
      const data = await res.json();
      return data.id;
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };
  return (
    <PayPalButtons
      className="w-full"
      fundingSource="paypal"
      style={{ shape: `pill` }}
      createOrder={createOrder}
      onApprove={(data, actions) => {
        toast.success(`Your Order is Complete `);
        return onApprove(data.orderID);
      }}
    />
  );
}
export default PaypalBtn;
