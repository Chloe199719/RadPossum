import prismaClient from "@/lib/prisma/prismaClient";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

import Image from "next/image";
import { H1, H2, H3, H4, H6, H5 } from "@/components/ReactMarkDown/Headings";
import { Li, Ol, Ul } from "@/components/ReactMarkDown/Lists";
import { A, IMG } from "@/components/ReactMarkDown/LinksImages";
import { PTag } from "@/components/ReactMarkDown/Paragraph";
import PostCommentBox from "./[id]/PostCommentBox";
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
              <h2 className="text-2xl md:text-5xl my-12 text-black ">
                {post?.title}
              </h2>
              <p className=" text-black self-end text-lg">
                Posted at : {post.createdAT.toLocaleString()}
              </p>
              <article className="bg-white py-6 rounded-lg px-1 md:px-4 w-full ">
                <ReactMarkdown
                  components={{
                    h1: H1,
                    h2: H2,
                    h3: H3,
                    h4: H4,
                    h5: H5,
                    h6: H6,
                    ul: Ul,
                    ol: Ol,
                    li: Li,
                    a: (a) => {
                      return <A href={a.href!}>{a.children}</A>;
                    },
                    img: (a) => {
                      return <IMG src={a.src!} alt={a.alt!} />;
                    },
                    p: PTag,
                  }}
                  remarkPlugins={[remarkGfm]}
                  className="flex flex-col gap-1 px-2 md:px-10"
                >
                  {post.message}
                </ReactMarkdown>
              </article>
              <div className="flex-col flex justify-between  mt-10 w-full gap-2">
                <span className="text-xl text-black order-last">Comment</span>
                <div className="flex gap-2 items-center text-sm flex-col md:flex-row md:justify-end">
                  <div className="flex items-center gap-2">
                    {" "}
                    <span>Created by {post.user.name} </span>
                    <Image
                      className=" rounded-full"
                      src={post.user.image!}
                      alt={post.user.name!}
                      width={35}
                      height={35}
                    />{" "}
                  </div>
                  <span> Last Update at {post.updatedAT.toLocaleString()}</span>
                </div>
              </div>
              <PostCommentBox postID={post.id} />
              <div className="my-4 text-lg">
                <Link href={`/blog/${post.id}`}>Show Comments</Link>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
export default Page;
