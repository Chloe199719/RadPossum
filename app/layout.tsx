import QueryWrapper from "@/components/QueryWrapper";
import type { Metadata } from "next";
import NavBar from "../components/NavBar/NavBar";

import "./globals.css";

export const metadata: Metadata = {
  title: "RadPOSSUM",
  description: "RadPOSSUM take Control of your Voice",
  icons: { icon: `/favicon.ico` },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className=" bg-slate-50 		 ">
        <QueryWrapper>
          {" "}
          <NavBar />
          {children}
          <div id="modal"></div>
        </QueryWrapper>
      </body>
    </html>
  );
}
