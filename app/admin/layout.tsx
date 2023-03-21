import Link from "next/link";
import { Auth } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(Auth);

  if (!session?.user.isAdmin) {
    redirect(`/`);
  }

  return (
    <section className="min-h-screen flex flex-col py-28  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl pt-4 md:p-12 bg-zinc-200 w-screen relative">
        <h2 className="text-4xl text-gray-700">Admin Page</h2>
        <nav>
          <ul className="text-lg flex gap-2">
            <li>
              <Link className="link link-hover" href={`/`}>
                Bookings
              </Link>
            </li>
            <li>
              <div className="dropdown">
                <label tabIndex={0} className="link link-hover m-1">
                  Booking
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit"
                >
                  <li>
                    <Link href={"/admin/upcomingbookings"}>
                      UpComing Bookings{" "}
                    </Link>
                  </li>
                  <li>
                    <a>Past Bookings</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link className="link link-hover" href={`/`}>
                Bookings
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </div>
    </section>
  );
}
