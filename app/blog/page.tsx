import prismaClient from "@/lib/prisma/prismaClient";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

type Props = {};
const fetchPosts = async function () {
  const posts = await prismaClient.posts.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAT: `desc`,
    },
  });

  return posts;
};

async function Page({}: Props) {
  const posts = await fetchPosts();
  return (
    <main className="min-h-screen snap-y snap-mandatory overflow-y-scroll  flex gap-10 flex-col py-32  mx-auto items-center justify-center z-[5] bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className=" snap-start md:snap-center flex items-center justify-center"
          >
            {" "}
            <div className="font-mono max-w-7xl gap-3 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
              <h2 className=" text-4xl my-12 ">{post.title}</h2>
              <p className=" text-black self-end">
                Posted at :{post.createdAT.toLocaleString()}
              </p>
              <article>
                {" "}
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="test">
                  {post.message}
                </ReactMarkdown>
              </article>
              <div className=" flex justify-between  mt-10 w-full">
                <Link href={`/blog/${post.id}`}> Comments</Link>
                <span>
                  Created by {post.user.name} Last Update at{" "}
                  {post.updatedAT.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
export default Page;
