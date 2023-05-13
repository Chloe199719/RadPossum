import Hero from "@/app/Hero";
import prismaClient from "@/lib/prisma/prismaClient";
import About from "./About";
import Faq from "./Faq";
const fetchQA = async function () {
  try {
    const res = await prismaClient.questions.findMany();

    return res;
  } catch (e) {
    console.log(e, "Error");
  }
};

export default async function Home() {
  // const faqList = await fetchQA();

  return (
    <main className="min-h-screen snap-y snap-mandatory  overflow-y-scroll flex-grow">
      {/* @ts-expect-error */}
      <Hero />
      {/* @ts-expect-error */}
      <About />

      {/* <Faq data={faqList} /> */}
    </main>
  );
}
export const revalidate = 60;
