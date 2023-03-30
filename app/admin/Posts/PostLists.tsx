"use client";
import { Post } from "@/types";
import { posts } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PostItem from "./PostItem";

type Props = {
  posts: Post[];
  searchParams: {
    page: string | null;
  };
};
function PostLists({ searchParams, posts }: Props) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const router = useRouter();
  return (
    <div className="w-full ">
      <div className="flex flex-col gap-2">
        {posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })}
      </div>
      <div className="btn-group flex justify-center">
        <button
          onClick={() => {
            router.push(`/admin/Posts?page=${page === 1 ? page : page - 1}`);
          }}
          className="btn"
        >
          «
        </button>
        <button className="btn">Page {page}</button>
        <button
          className="btn"
          onClick={() => {
            router.push(`/admin/Posts?page=${page + 1}`);
          }}
        >
          »
        </button>
      </div>
    </div>
  );
}
export default PostLists;
