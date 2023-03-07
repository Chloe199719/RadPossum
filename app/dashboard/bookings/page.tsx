import React from "react";
import Bookings from "./bookings";

type Props = {};
function Page({}: Props) {
  /* @ts-expect-error */
  return <Bookings />;
}
export default Page;
