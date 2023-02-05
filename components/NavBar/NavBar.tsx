"use client";
import Avatar from "./Avatar";
import React, { useState } from "react";
import NavBarList from "./NavBarList";
import Modal from "./Portal";

type Props = {};

function NavBar({}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex  sticky top-1 p-5 justify-left gap-2 md:justify-between  max-w-7xl z-20 md:items-center mx-auto bg-zinc-50 shadow-xl flex-col md:flex-row rounded-lg ">
      <div className=" flex items-center p-2">
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
        <h2 className="text-3xl sm:text-4xl uppercase align-middle">
          Place Holder Title
        </h2>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        {" "}
        <ul className="hidden md:flex space-x-4 text-xl  ">
          <NavBarList />
        </ul>
        <Avatar />
      </div>
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
    </nav>
  );
}

export default NavBar;
