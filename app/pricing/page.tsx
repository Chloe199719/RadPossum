import prismaClient from "@/lib/prisma/prismaClient";
import Image from "next/image";
type Props = {};

async function getShopItems() {
  try {
    const data = await prismaClient.paypal_items.findMany();
    return data;
  } catch (error) {
    return null;
  }
}

async function page({}: Props) {
  const data = await getShopItems();
  if (!data)
    return (
      <section className="relative min-h-screen snap-start md:snap-center flex flex-col items-center justify-center py-28 bg-zinc-200 gap-10  bg-gradient-to-br from-[#30bead]/30 to-[#ff7e84]/40">
        <h2 className="text-2xl md:text-4xl">Pricing</h2>
        <div className="max-w-7xl flex flex-col w-screen bg-zinc-200 z-50">
          <h3 className="text-4xl text-center"> Error Getting Pricing</h3>
        </div>
        <Image
          className="absolute bottom-0 right-0 opacity-60 z-10 w-48 md:w-auto"
          src="/effect8.png"
          alt="hero"
          width={880}
          height={880}
        ></Image>
        <Image
          className=" absolute  top-24  left-0 opacity-40  z-10 w-auto "
          src="/effect9.png"
          alt="hero"
          width={580}
          height={580}
        ></Image>
      </section>
    );
  return (
    <section className="relative min-h-screen snap-start md:snap-center flex flex-col items-center justify-center py-28 bg-zinc-200 gap-10  bg-gradient-to-br from-[#30bead]/30 to-[#ff7e84]/40">
      <h2 className="text-2xl md:text-4xl">Pricing</h2>
      <div className="max-w-7xl flex flex-col w-screen bg-zinc-200 z-50 space-y-4">
        <table className="table w-full">
          {/* head*/}{" "}
          <caption className="caption-top ">Booking Pricing</caption>
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Privacy</th>
              <th>Normal Price</th>
              <th>Saturday Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.duration}</td>
                  <td>{item.privacy}</td>
                  <td>
                    {item.price_standard} {process.env.CURRENCY}
                  </td>
                  <td>
                    {item.price_saturday} {process.env.CURRENCY}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Image
        className="absolute bottom-0 right-0 opacity-60 z-10 w-48 md:w-auto"
        src="/effect8.png"
        alt="hero"
        width={880}
        height={880}
      ></Image>
      <Image
        className=" absolute  top-24  left-0 opacity-40  z-10 w-auto "
        src="/effect9.png"
        alt="hero"
        width={580}
        height={580}
      ></Image>
    </section>
  );
}
export default page;
