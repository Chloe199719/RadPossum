import prismaClient from "@/lib/prisma/prismaClient";
import Faq from "../Faq";

type Props = {};

async function getFaq() {
  try {
    const data = await prismaClient.questions.findMany();
    return data;
  } catch (error) {
    return null;
  }
}

async function page({}: Props) {
  const faq = await getFaq();
  if (!faq) return <div>error</div>;
  return <Faq data={faq!} />;
}
export default page;
