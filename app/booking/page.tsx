"use client";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useRouter } from "next/navigation";
import pb from "@/lib/pocketbase";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
type Props = {};
function Page({}: Props) {
  const router = useRouter();
  const onClick = async function () {
    try {
      const test = await fetch("/api/checkout_sessions", {
        method: `POST`,
        body: JSON.stringify({ clientID: pb.authStore.model?.id }),
      });
      const data = await test.json();
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen  flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
        <div className="flex gap-4 w-full ">
          <button onClick={onClick}>TEST</button>
        </div>
      </div>
    </main>
  );
}
export default Page;
