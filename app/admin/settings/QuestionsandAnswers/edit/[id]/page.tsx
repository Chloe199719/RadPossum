import prismaClient from "@/lib/prisma/prismaClient";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import QuestionForm from "./QuestionForm";

type Props = {
  params: {
    id: string;
  };
};
async function fetchItem(id: string) {
  try {
    const data = await prismaClient.questions.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}

async function Page({ params }: Props) {
  const data = await fetchItem(params.id);
  if (!data)
    return (
      <div className="w-full flex flex-col gap-3 relative">
        <h1 className=" text-5xl text-center">Post Not Found</h1>
        <Link
          className="absolute left-1 p-2 hover:bg-slate-400 rounded-full"
          href={"/admin/settings/QuestionsandAnswers"}
        >
          <AiOutlineArrowLeft className=" w-8 h-8 " />
        </Link>
      </div>
    );
  return (
    <div className="w-full space-y-6 relative">
      <h2 className="text-3xl text-center">Editing Q&A</h2>
      <Link
        className="absolute left-1 top-0 p-2 hover:bg-slate-400 rounded-full"
        href={"/admin/settings/QuestionsandAnswers"}
      >
        <AiOutlineArrowLeft className=" w-8 h-8 " />
      </Link>
      <QuestionForm item={data} />
    </div>
  );
}
export default Page;
