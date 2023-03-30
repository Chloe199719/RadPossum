import prismaClient from "@/lib/prisma/prismaClient";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PostLists from "./PostLists";

async function fetchPosts() {
  const res = await prismaClient.posts.findMany({});
  return res;
}

type Props = {};
async function Page({}: Props) {
  const data = await fetchPosts();
  return (
    <div className="w-full flex flex-col gap-3 relative">
      <h2 className="text-3xl text-center">Create New Post</h2>
      <Link
        className="absolute left-1 p-2 hover:bg-slate-400 rounded-full"
        href={"/admin"}
      >
        <AiOutlineArrowLeft className=" w-8 h-8 " />
      </Link>{" "}
      <PostLists posts={data} />
    </div>
  );
}
export default Page;
