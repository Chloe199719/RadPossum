import Image from "next/image";
import React from "react";
import { SocialIcon } from "react-social-icons";

type Props = {};

function About({}: Props) {
  return (
    <section className="min-h-screen snap-start md:snap-center flex flex-col items-center justify-center py-28 bg-zinc-200 ">
      <div className="max-w-7xl flex flex-col md:flex-row items-center justify-center relative gap-6 p-2 md:p-10 bg-gradient-to-r from-[#ff7e84]/40 to-[#30bead]/30 rounded-xl shadow-lg">
        <div className=" z-10">
          <Image
            className=" rounded-xl"
            src="/jana.jpg"
            alt="Jana"
            width={1500}
            height={2000}
          />
        </div>
        <div className="relative flex flex-col gap-4  z-10">
          <h1 className=" text-zinc-800 font-mono text-8xl uppercase tracking-widest ">
            About Me
          </h1>
          <p className=" text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa,
            quisquam! Assumenda nulla eos rerum a fugiat, magni obcaecati
            molestias necessitatibus corrupti dolorem laborum est qui tempore
            voluptatem magnam suscipit voluptates.
          </p>{" "}
          <p className=" text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa,
            quisquam! Assumenda nulla eos rerum a fugiat, magni obcaecati
            molestias necessitatibus corrupti dolorem laborum est qui tempore
            voluptatem magnam suscipit voluptates.
          </p>
          <h4 className="text-[#0c1327] text-6xl font-mono uppercase tracking-widest">
            Social Media
          </h4>
          <div className="flex gap-4">
            <SocialIcon url="https://twitter.com/janehere__" />
            <SocialIcon url="https://twitter.com/janehere__" />
            <SocialIcon url="https://twitter.com/janehere__" />
            <SocialIcon url="https://twitter.com/janehere__" />
          </div>
        </div>
        <Image
          className=" absolute  top-0  left-0 opacity-80  z-[6]"
          src="/effect7.png"
          alt="hero"
          width={580}
          height={580}
        ></Image>
        <Image
          className="   absolute  bottom-2  -right-10 md:right-0 opacity-60 rotate-12 z-[6]"
          src="/effect4.png"
          alt="hero"
          width={180}
          height={180}
        ></Image>
      </div>
    </section>
  );
}

export default About;
