import CommentProvider from "@/components/context/ComentsContext";
import prismaClient from "@/lib/prisma/prismaClient";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import Comments from "./Comments";
import PostCommentBox from "./PostCommentBox";
import Image from "next/image";
import { H1, H2, H3, H4, H6, H5 } from "@/components/ReactMarkDown/Headings";
import { Li, Ol, Ul } from "@/components/ReactMarkDown/Lists";
import { A, IMG } from "@/components/ReactMarkDown/LinksImages";
import { PTag } from "@/components/ReactMarkDown/Paragraph";

type Props = {
  params: {
    id: string;
  };
};
const fetchPost = async function (id: string) {
  const posts = await prismaClient.posts.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  return posts;
};

async function Page({ params }: Props) {
  const post = await fetchPost(params.id);
  if (post === null) {
    return (
      <main className="min-h-screen snap-y snap-mandatory overflow-y-scroll  flex gap-10 flex-col py-32  mx-auto items-center justify-center z-[5] bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
        <h2 className="text-5xl">Your Post Could not be Found</h2>
      </main>
    );
  }
  return (
    <main className="min-h-screen snap-y snap-mandatory overflow-y-scroll  flex gap-10 flex-col py-32  mx-auto items-center justify-center z-[5] bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className=" snap-start md:snap-center flex items-center justify-center">
        {" "}
        <div className="font-mono max-w-7xl gap-3 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
          <h2 className=" text-5xl my-12 text-black ">{post?.title}</h2>
          <p className=" text-black self-end text-lg">
            Posted at : {post.createdAT.toLocaleString()}
          </p>
          <article className="bg-white py-6 rounded-lg px-4 w-full text-center flex flex-col items-center">
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
              className="blog-style"
            >
              {post.message}
            </ReactMarkdown>
          </article>
          <div className=" flex justify-between  mt-10 w-full">
            <span className="text-xl text-black">Comment</span>
            <div className="flex gap-2 items-center">
              <span>Created by {post.user.name} </span>
              <Image
                className=" rounded-full"
                src={post.user.image!}
                alt={post.user.name!}
                width={35}
                height={35}
              />{" "}
              <span> Last Update at {post.updatedAT.toLocaleString()}</span>
            </div>
          </div>
          <PostCommentBox postID={post.id} />
          <CommentProvider postID={post.id}>
            <Comments postID={params.id} />
          </CommentProvider>
        </div>
      </div>
    </main>
  );
}
export default Page;
