import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import(`./dashboard`), { ssr: false });

type Props = {};
function Page({}: Props) {
  return <Dashboard />;
}
export default Page;
