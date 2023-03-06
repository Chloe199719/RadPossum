import React from "react";
import dynamic from "next/dynamic";
import Bookings from "./bookings";

type Props = {};
function Page({}: Props) {
  /* @ts-expect-error */
  return <Bookings />;
}
export default Page;
