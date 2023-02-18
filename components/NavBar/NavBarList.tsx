import Link from "next/link";
import React from "react";

type Props = {};

function NavBarList({}: Props) {
  return (
    <>
      <Link href="#">
        {" "}
        <li>RESOURCES</li>
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
