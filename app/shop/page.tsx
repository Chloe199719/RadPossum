import React from "react";
import ShopCard from "./shopCard";
import prismaClient from "@/lib/prisma/prismaClient";
import { Auth } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { shop } from "@prisma/client";

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
    // const res = await fetch(
    //   `${process.env.DB_URL}api/collections/shop_frontend/records/?API_KEY=${process.env.API_KEY}`,
    //   {
    //     method: `GET`,
    //     next: { revalidate: parseInt(process.env.REVALIDATE!) },
    //   }
    // );
    // if (!res.ok) {
    //   console.log(res);
    // }
    // const data = await res.json();
    // return data.items
    const res = await prismaClient.shop.findMany();
    return res;
  } catch (e) {
    console.log(e, "Error");
  }
};
async function Page({}: Props) {
  const cards = await fetchCards();

  const session = await getServerSession(Auth);

  return (
    <main className="min-h-screen flex flex-col py-28 pb-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-6xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-full">
        <h2 className="text-4xl">Shop</h2>

        {!session ? (
          <h2 className="text-red-500 text-2xl">Login First</h2>
        ) : (
          <div className="grid  md:grid-cols-2 gap-4">
            {cards?.map((card: shop) => {
              return <ShopCard key={card.id} card={card} />;
            })}
          </div>
        )}
      </div>
    </main>
  );
}
export default Page;
