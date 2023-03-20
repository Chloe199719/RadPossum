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
        <li className="uppercase">Booking</li>
      </Link>
      <Link className="link link-hover" href="/shop">
        {" "}
        <li className=" uppercase">Shop</li>
      </Link>
      <Link className="link link-hover" href="/blog">
        {" "}
        <li className=" uppercase">Blog</li>
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
