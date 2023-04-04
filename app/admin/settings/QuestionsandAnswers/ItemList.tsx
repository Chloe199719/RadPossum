"use client";
import { Questions } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Item from "./Item";

type Props = {
  data: Questions[];
  searchParams: {
    page: string | null;
  };
};
function ItemList({ data, searchParams }: Props) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const router = useRouter();
  return (
    <div className="w-full space-y-6">
      {" "}
      {data.map((item) => {
        return <Item key={item.id} item={item} />;
      })}
      <div>
        {" "}
        <Link href={`/admin/settings/QuestionsandAnswers/new`}>
          <button className="btn w-full">Create New Q&A</button>
        </Link>
      </div>
      <div className="btn-group flex justify-center">
        <button
          onClick={() => {
            router.push(
              `/admin/settings/QuestionsandAnswers?page=${
                page === 1 ? page : page - 1
              }`
            );
          }}
          className="btn"
        >
          «
        </button>
        <button className="btn">Page {page}</button>
        <button
          className="btn"
          onClick={() => {
            router.push(`/admin/settings/QuestionsandAnswers?page=${page + 1}`);
          }}
        >
          »
        </button>
      </div>
    </div>
  );
}
export default ItemList;
