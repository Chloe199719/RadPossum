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
          <ul className="flex gap-2">
            <li>
              <Link className="link link-hover" href={`/`}>
                {" "}
                Bookings
              </Link>
            </li>
            <li>Bookings</li>
            <li>Bookings</li>
          </ul>
        </nav>
        {children}
      </div>
    </section>
  );
}
