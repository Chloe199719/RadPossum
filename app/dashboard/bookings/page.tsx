import React from "react";
import dynamic from "next/dynamic";

const Bookings = dynamic(() => import(`./bookings`), { ssr: false });

type Props = {};
function Page({}: Props) {
  return <Bookings />;
}
export default Page;
