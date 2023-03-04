import React from "react";
import ShopCard from "./shopCard";
import prismaClient from "@/lib/prisma/prismaClient";
import { Auth } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

type cards = {
  id: string;
  title: string;
  desc: string;
  paypal_ID: string;
  stripes_ID: string;
  image: string;
};

type Props = {};
const fetchCards = async function () {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/shop_frontend/records/?API_KEY=${process.env.API_KEY}`,
      {
        method: `GET`,
        next: { revalidate: parseInt(process.env.REVALIDATE!) },
      }
    );
    if (!res.ok) {
      console.log(res);
    }
    const data = await res.json();

    return data.items;
  } catch (e) {
    console.log(e, "Error");
  }
};
async function Page({}: Props) {
  const cards: cards[] = await fetchCards();
  // console.log(await prismaClient.aboutme.findMany());
  const session = await getServerSession(Auth);
  console.log(session);
  return (
    <main className="min-h-screen flex flex-col py-28 pb-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-6xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-full">
        <h2 className="text-4xl">Shop</h2>

        <div className="grid  md:grid-cols-2 gap-4">
          {cards.map((card: cards) => {
            return <ShopCard key={card.id} card={card} />;
          })}
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
        </div>
      </div>
    </main>
  );
}
export default Page;
