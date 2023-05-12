"use client";
// import Avatar from "./Avatar";
import React, { useState } from "react";
import NavBarList from "./NavBarList";
import Modal from "../../app/Portal";
import Image from "next/image";
import { motion } from "framer-motion";

import Link from "next/link";
import Avatar from "./Avatar";

type Props = {};

function NavBar({}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.1, 0.2, 0.4, 0.5, 0.7, 0.5, 0.8, 1] }}
      transition={{ duration: 1.2, delayChildren: 0.5 }}
      className="flex  fixed top-0  left-0 right-0  justify-left gap-2 md:justify-between max-w-full z-30 md:items-center mx-auto bg-zinc-50 shadow-xl flex-col  "
    >
      <div className=" flex p-5 flex-col  gap-2  md:justify-between  max-w-7xl z-20 md:items-center mx-auto md:flex-row w-screen">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: [0.1, 0.2, 0.4, 0.5, 0.7, 0.5, 0.8, 1] }}
          transition={{
            when: "afterChildren",
            duration: 1.5,
            delay: 0.5,
            ease: [0.17, 0.67, 0.83, 0.67],
            bounce: 0.85,
            velocity: 2,
          }}
          className=" flex items-center p-2"
        >
          {" "}
          <svg
            onClick={() => {
              setOpen(!open);
            }}
            className=" w-10 h-10 inline md:hidden "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
          <Link href={"/"}>
            <div className="flex items-center justify-center gap-2">
              <Image
                className="hidden md:block w-12 h-12 rounded-full"
                src="/logo.jpg"
                alt="logo"
                width={48}
                height={48}
              />
              <h2 className="text-3xl sm:text-4xl uppercase align-middle tracking-widest	">
                Rad Possum
              </h2>
            </div>
          </Link>
        </motion.div>
        {/* <div className="hidden md:flex flex-1 gap-8 items-center justify-between"> */}{" "}
        <motion.ul
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: [0.1, 0.2, 0.4, 0.5, 0.7, 0.5, 0.8, 1] }}
          transition={{
            duration: 1.8,
            delay: 0.5,
            ease: [0.17, 0.67, 0.83, 0.67],
            bounce: 0.85,
            velocity: 2,
          }}
          className="hidden md:flex space-x-4 text-xl  "
        >
          <NavBarList />
        </motion.ul>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: [0.1, 0.2, 0.4, 0.5, 0.7, 0.5, 0.8, 1] }}
          transition={{
            when: "afterChildren",
            duration: 1.5,
            delay: 0.5,
            ease: [0.17, 0.67, 0.83, 0.67],
            bounce: 0.85,
            velocity: 2,
          }}
          className="hidden md:flex"
        >
          {" "}
          <Avatar />
        </motion.div>
        {/* </div> */}
        {/* Mobile Nav Bar */}
        {open ? (
          <ul className="relative bottom 0 md:hidden text-3xl space-y-2">
            <hr className=" border-t-2 border-black " />
            <NavBarList />
            <hr className=" border-t-2 border-black " />
            <Avatar />
            {/* <div className=" absolute inset-0 z-10 bg-black "></div> */}
            {open ? <Modal fun={setOpen} /> : null}
          </ul>
        ) : null}
      </div>
    </motion.nav>
  );
}

export default NavBar;
