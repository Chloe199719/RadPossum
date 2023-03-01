import Link from "next/link";
import React from "react";

type Props = {};

function NavBarList({}: Props) {
  return (
    <>
      <Link href="/resources">
        {" "}
        <li>RESOURCES</li>
      </Link>
      <Link href="/booking">
        {" "}
        <li className="text-red-800 uppercase">Booking</li>
      </Link>
      <Link href="/shop">
        {" "}
        <li className="text-blue-800 uppercase">Shop</li>
      </Link>
      <Link href="/contact">
        {" "}
        <li>CONTACT ME</li>
      </Link>
      {/* <li>ABC</li> */}
    </>
  );
}

export default NavBarList;
