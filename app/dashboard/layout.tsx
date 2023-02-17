import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
        <div className="flex gap-4 w-full">
          <div className="flex justify-center ">
            <nav>
              <ul className="text-2xl flex flex-col gap-1">
                <Link href={"/dashboard"}>
                  <li className="border border-sky-300 py-2 px-10 rounded-lg hover:bg-sky-600">
                    DashBoard
                  </li>
                </Link>
                <Link href={"/dashboard/settings"}>
                  <li className="border border-sky-300 py-2 px-10 rounded-lg  hover:bg-sky-600">
                    Settings
                  </li>
                </Link>
                <Link href={"/dashboard/lessons"}>
                  {" "}
                  <li className="border border-sky-300 py-2 px-10 rounded-lg  hover:bg-sky-600">
                    Lessons
                  </li>
                </Link>
              </ul>
            </nav>
          </div>{" "}
          {children}
        </div>
      </div>
    </section>
  );
}
