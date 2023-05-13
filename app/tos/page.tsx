import prismaClient from "@/lib/prisma/prismaClient";
import Image from "next/image";

async function getTerms() {
  try {
    const terms = await prismaClient.terms.findMany({
      orderBy: {
        text: "asc",
      },
    });
    return terms;
  } catch (error) {
    return null;
  }
}

type Props = {};
async function page({}: Props) {
  const terms = await getTerms();
  terms?.sort((a, b) => {
    // Extract the initial number by splitting the string at the first space
    // and parsing the number part (without the period)
    let aNum = parseInt(a.text.split(" ")[0]);
    let bNum = parseInt(b.text.split(" ")[0]);

    // Compare the numbers
    return aNum - bNum;
  });
  if (!terms) {
    return (
      <section className="relative min-h-screen snap-start md:snap-center flex flex-col items-center justify-center py-28 bg-zinc-200 gap-10  bg-gradient-to-br from-[#30bead]/30 to-[#ff7e84]/40">
        <h2 className="text-2xl md:text-4xl">Terms of Service</h2>

        <div className="max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl pt-4 md:p-12 bg-zinc-200 w-screen relative z-20">
          <h3 className="text-2xl md:text-4xl">No Terms Found</h3>
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
  return (
    <section className="relative min-h-screen snap-start md:snap-center flex flex-col items-center justify-center py-28 bg-zinc-200 gap-10  bg-gradient-to-br from-[#30bead]/30 to-[#ff7e84]/40">
      <h2 className="text-2xl md:text-4xl">Terms of Service</h2>

      <div className="max-w-7xl gap-8 flex flex-col items-center justify-center mx-auto  border-black rounded-xl pt-4 md:p-12 bg-zinc-200 w-screen relative z-20">
        <ol className="space-y-2 text-lg">
          {terms.map((term, index) => {
            return (
              <li key={index} className="text-left">
                {term.text}
              </li>
            );
          })}
        </ol>
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
