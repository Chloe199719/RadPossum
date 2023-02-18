import Link from "next/link";
import Search from "./search";

const fetchResources = async () => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/resources/records/`,
      {
        method: `get`,
        next: { revalidate: 100 },
      }
    );
    if (!res.ok) {
      console.log(res);
    }
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e, "Error");
  }
};

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const data = await fetchResources();

  return (
    <main className="min-h-screen  flex flex-col py-24  mx-auto items-center justify-center z-[5] snap-start md:snap-center bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className="font-mono max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
        <div className="flex gap-4 w-full ">
          <Search data={data} />

          {children}
        </div>
      </div>
    </main>
  );
}
