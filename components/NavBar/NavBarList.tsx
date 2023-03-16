import Link from "next/link";
import React from "react";

type Props = {};

function NavBarList({}: Props) {
  return (
    <>
      <Link className="link link-hover" href="/resources">
        {" "}
        <li>RESOURCES</li>
      </Link>
      <Link className="link link-hover" href="/booking">
        {" "}
        <li className="text-red-800 uppercase">Booking</li>
      </Link>
      <Link className="link link-hover" href="/shop">
        {" "}
        <li className="text-blue-800 uppercase">Shop</li>
      </Link>
      <Link className="link link-hover" href="/blog">
        {" "}
        <li className="text-orange-800 uppercase">Blog</li>
      </Link>
      <Link className="link link-hover" href="/contact">
        {" "}
        <li>CONTACT ME</li>
      </Link>
      {/* <li>ABC</li> */}
    </>
  );
}

export default NavBarList;
