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
  // console.log(data);
  // const faqList = [
  //   {
  //     id: 1,
  //     question: "What is the capital of France?",
  //     answer: "The capital of France is Paris.",
  //   },
  //   {
  //     id: 2,
  //     question: "What is the largest planet in our solar system?",
  //     answer: "Jupiter is the largest planet in our solar system.",
  //   },
  //   {
  //     id: 3,
  //     question: "Who won the first Nobel Prize in Physics?",
  //     answer: "Wilhelm Röntgen won the first Nobel Prize in Physics in 1901.",
  //   },
  //   {
  //     id: 4,
  //     question: "What is the name of the first man to walk on the moon?",
  //     answer: "Neil Armstrong was the first man to walk on the moon.",
  //   },
  //   {
  //     id: 5,
  //     question: "What is the currency used in Japan?",
  //     answer: "The currency used in Japan is the Japanese yen (¥).",
  //   },
  // ];

  const faqList = await fetchQA();

  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* @ts-expect-error */}
      <Hero />
      {/* @ts-expect-error */}
      <About />

      <Faq data={faqList} />
    </main>
  );
}
export const revalidate = 60;
