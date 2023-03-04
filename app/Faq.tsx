import { Questions } from "@prisma/client";
import Image from "next/image";
import React from "react";
import FaqItem from "./FaqItem";

type Props = {
  data: Questions[] | undefined;
};
function Faq({ data }: Props) {
  return (
    <section className="relative min-h-screen snap-start md:snap-center flex flex-col items-center justify-center py-28 bg-zinc-200 gap-10  bg-gradient-to-br from-[#30bead]/30 to-[#ff7e84]/40">
      <h2 className="text-2xl md:text-4xl">Frequently Asked Questions</h2>
      <div className="max-w-7xl flex flex-col w-screen">
        <ul className="flex flex-col  px-2 md:px-0 z-20 shadow-xl">
          {data?.map((e) => {
            return (
              <li key={e.id}>
                <FaqItem data={e} />
                <hr className="border-1 border-gray-600 " />
              </li>
            );
          })}
        </ul>
      </div>
      <Image
        className="absolute bottom-0 right-0 opacity-60 z-10 w-48 md:w-auto"
        src="/effect8.png"
        alt="hero"
        width={880}
        height={880}
      ></Image>
      <Image
        className=" absolute  top-24  left-0 opacity-40  z-10 w-auto "
        src="/effect9.png"
        alt="hero"
        width={580}
        height={580}
      ></Image>
    </section>
  );
}
export default Faq;
