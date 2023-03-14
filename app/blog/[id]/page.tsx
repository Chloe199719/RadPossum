import CommentProvider from "@/components/context/ComentsContext";
import prismaClient from "@/lib/prisma/prismaClient";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import Comments from "./Comments";
import PostCommentBox from "./PostCommentBox";

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
        <h2>Your Post Could not be Found</h2>
      </main>
    );
  }
  return (
    <main className="min-h-screen snap-y snap-mandatory overflow-y-scroll  flex gap-10 flex-col py-32  mx-auto items-center justify-center z-[5] bg-gradient-to-b from-[#30bead]/30 to-[#ff7e84]/40">
      <div className=" snap-start md:snap-center flex items-center justify-center">
        {" "}
        <div className="font-mono max-w-7xl gap-3 flex flex-col items-center justify-center mx-auto  border-black rounded-xl p-12 bg-zinc-200 w-screen">
          <h2 className=" text-4xl my-12 text-black ">{post?.title}</h2>
          <p className=" text-black self-end">
            Posted at : {post.createdAT.toLocaleString()}
          </p>
          <article>
            {" "}
            <ReactMarkdown remarkPlugins={[remarkGfm]} className="test">
              {post.message}
            </ReactMarkdown>
          </article>
          <div className=" flex justify-between  mt-10 w-full">
            <span>Comments</span>
            <span>
              Created by {post.user.name} Last Update at{" "}
              {post.updatedAT.toLocaleString()}
            </span>
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
