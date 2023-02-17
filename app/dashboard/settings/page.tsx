import dynamic from "next/dynamic";
import React from "react";
const Settings = dynamic(() => import(`./settings`), { ssr: false });
type Props = {};

function page({}: Props) {
  return <Settings />;
}
export default page;
