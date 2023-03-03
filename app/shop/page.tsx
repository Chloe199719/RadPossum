import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <main className="min-h-screen flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-6xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-full">
        <h2 className="text-4xl">Shop</h2>
        <div className="grid  md:grid-cols-2 gap-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src="/chloe.png" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end items-center">
                <label htmlFor="amount">Amount:</label>
                <input
                  id="amount"
                  type="number"
                  placeholder="1"
                  max={10}
                  min={1}
                  className="input w-12 p-0"
                ></input>{" "}
                <button className="btn btn-warning">PayPal</button>
                {/* TThis Would be a Paypal Button */}
                <button className="btn btn-primary">Buy Now</button>
                {/* This Would a Stripes button */}
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src="/chloe.png" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src="/chloe.png" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src="/chloe.png" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Page;
