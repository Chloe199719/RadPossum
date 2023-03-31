import prismaClient from "@/lib/prisma/prismaClient";
import { Post } from "@/types";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import EditForm from "./editform";

type Props = {
  params: {
    id: string;
  };
};

async function getPostToEdit(id: string) {
  try {
    const data = await prismaClient.posts.findUnique({
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
  {
    const ediPost: Post | null = await getPostToEdit(params.id);

    if (!ediPost)
      return (
        <div className="w-full flex flex-col gap-3 relative">
          <h1 className=" text-5xl text-center">Post Not Found</h1>
          <Link
            className="absolute left-1 p-2 hover:bg-slate-400 rounded-full"
            href={"/admin/Posts"}
          >
            <AiOutlineArrowLeft className=" w-8 h-8 " />
          </Link>
        </div>
      );
    //@ts-expect-error
    ediPost.createdAT = ediPost.createdAT.getTime();
    //@ts-expect-error
    ediPost.updatedAT = ediPost.updatedAT.getTime();
    return (
      <div className="w-full flex flex-col gap-3 relative">
        <h2 className="text-3xl text-center">Editing {ediPost.title}</h2>
        <Link
          className="absolute left-1 p-2 hover:bg-slate-400 rounded-full"
          href={"/admin"}
        >
          <AiOutlineArrowLeft className=" w-8 h-8 " />
        </Link>
        <EditForm post={ediPost} />
      </div>
    );
  }
}
export default Page;
