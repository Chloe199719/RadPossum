import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
        {/* <div className="drawer drawer-mobile relative">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden absolute top-0 left-0 z-100"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div> */}
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
                </Link>{" "}
                <Link href="/dashboard/bookings">
                  {" "}
                  <li className="border border-sky-300 py-2 px-10 rounded-lg  hover:bg-sky-600">
                    Bookings
                  </li>
                </Link>
                <Link href="/dashboard/codes">
                  {" "}
                  <li className="border border-sky-300 py-2 px-10 rounded-lg  hover:bg-sky-600">
                    Code Redeem
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
