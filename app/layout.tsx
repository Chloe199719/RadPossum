import QueryWrapper from "@/components/QueryWrapper";
import { Auth } from "@/pages/api/auth/[...nextauth]";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import NavBar from "../components/NavBar/NavBar";
import Footer from "./footer";

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
  const session = await getServerSession(Auth);
  return (
    <html lang="en" data-theme="winter">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className=" bg-slate-50  ">
        <QueryWrapper session={session}>
          {" "}
          <NavBar />
          {children}
          <div id="modal"></div>
          <Footer />
        </QueryWrapper>
      </body>
    </html>
  );
}
