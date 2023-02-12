import Link from "next/link";
import React from "react";

type Props = {};

function NavBarList({}: Props) {
  return (
    <>
      <li>
        <Link href="#"> RESOURCES</Link>
      </li>
      <li>BOOKING</li>
      <li>
        <Link href="/contact"> CONTACT ME </Link>
      </li>
      {/* <li>ABC</li> */}
    </>
  );
}

export default NavBarList;
