import NavBar from "../components/NavBar/NavBar";
import Avatar from "../components/NavBar/Avatar";
import "./globals.css";

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
        <NavBar />
        {children}
        <div id="modal"></div>
      </body>
    </html>
  );
}
