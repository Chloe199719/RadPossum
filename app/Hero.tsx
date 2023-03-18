import prismaClient from "@/lib/prisma/prismaClient";
import Image from "next/image";
import React from "react";
import Link from "next/link";
type Props = {};
const fetchHero = async function () {
  const data = await prismaClient.hero.findFirst();
  return data;
};

async function Hero({}: Props) {
  const data = await fetchHero();
  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-l from-[#30bead]/30 to-[#ff7e84]/40 mx-auto items-center justify-center z-[5] snap-start md:snap-center py-28 relative">
      <div className="max-w-7xl flex flex-col md:flex-row items-center ">
        <div className="flex-1 flex flex-col space-y-10 p-5 z-10">
          {" "}
          <h1 className="text-5xl md:text-8xl tracking-wider  font-semibold ">
            {data?.titleFirst}
            <span className="text-[#30bead]/80 underline decoration-[6px] underline-offset-8 ">
              {" "}
              {data?.higlightText}
            </span>{" "}
            {data?.mainText}
          </h1>
          <p className="px-2 text-lg tracking-widest">{data?.titleSec}</p>
          <Link href={`/booking`} className="w-full flex">
            {" "}
            <button className=" text-lg uppercase bg-[#30bead]/60 rounded-md py-3 font-bold  flex-1">
              book a lesson now
            </button>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center  ">
          <div className=" flex items-center justify-center border-4 border-[#30bead] rounded-full md:w-[500px]  md:h-[500px]  ">
            {" "}
            <div className=" flex items-center justify-center border-4 border-[#ff7e84] bg-[#30bead] rounded-full md:w-[480px] relative md:h-[480px] z-[9] ">
              <Image
                className=" z-10 "
                src="/hero3.png"
                alt="hero"
                width={600}
                height={1000}
              ></Image>
              <Image
                className=" absolute rotate-180 bottom-0 right-0  top-0 left-0 opacity-80 rounded-full"
                src="/effect.png"
                alt="hero"
                width={480}
                height={480}
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <Image
        className=" absolute  top-24  left-0 opacity-80  z-[6]"
        src="/effect2.png"
        alt="hero"
        width={580}
        height={580}
      ></Image>{" "}
      <Image
        className="   absolute  bottom-0  right-0 opacity-60  z-[6]"
        src="/effect3.png"
        alt="hero"
        width={880}
        height={880}
      ></Image>
      <Image
        className="hidden md:block absolute  top-32  right-40 opacity-60  z-[6]"
        src="/effect6.png"
        alt="hero"
        width={600}
        height={600}
      ></Image>
    </section>
  );
}

export default Hero;
