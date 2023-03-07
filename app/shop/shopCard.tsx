"use client";
import { shop } from "@prisma/client";
import { useRef } from "react";
import PaypalBtn from "./PaypalBtn";

type Props = {
  card: shop;
};
function ShopCard({ card }: Props) {
  const valueRef = useRef<HTMLInputElement>(null);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="/chloe.png" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{card.title}</h2>
        <p>{card.desc}</p>
        <div className="card-actions justify-end items-center">
          <label htmlFor="amount">Amount:</label>
          <input
            ref={valueRef}
            id="amount"
            type="number"
            defaultValue={1}
            max={10}
            min={1}
            className="input w-12 h-fit p-0 pl-2"
          ></input>{" "}
          <PaypalBtn value={valueRef} card={card} />
          {/* TThis Would be a Paypal Button */}
          <button className=" w-full btn btn-primary">Buy Now</button>
          {/* This Would a Stripes button */}
        </div>
      </div>
    </div>
  );
}
export default ShopCard;
