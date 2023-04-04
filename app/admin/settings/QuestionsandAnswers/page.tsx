import prismaClient from "@/lib/prisma/prismaClient";
import ItemList from "./ItemList";

async function fetchQuestions(take: number) {
  try {
    const data = await prismaClient.questions.findMany({
      take: 10,
      skip: (take - 1) * 10,
    });
    return data;
  } catch (error) {
    return null;
  }
}

type Props = {
  searchParams: {
    page: string;
  };
};
async function Page({ searchParams }: Props) {
  const data = await fetchQuestions(
    searchParams.page ? parseInt(searchParams.page) : 1
  );

  return (
    <div className="w-full space-y-5">
      <h2 className=" text-3xl text-center">Questions and Answers</h2>
      <ItemList data={data!} searchParams={searchParams} />
    </div>
  );
}
export default Page;
