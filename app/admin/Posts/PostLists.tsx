import { posts } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PostItem from "./PostItem";

type Props = {
  posts: posts[];
  searchParams: {
    page: string | null;
  };
};
function PostLists({ searchParams, posts }: Props) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="w-full ">
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
      <div className="btn-group flex justify-center">
        <button
          //   onClick={() => {
          //     setPage(page === 1 ? page : page - 1);
          //   }}
          className="btn"
        >
          <Link
            className="w-full h-full flex items-center justify-center"
            href={`/admin/Posts?page=${page === 1 ? page : page - 1}`}
          >
            {" "}
            «
          </Link>
        </button>
        <button className="btn">Page {page}</button>
        <button
          //   onClick={() => {
          //     setPage(data.length / 10 > page ? page + 1 : page);
          //   }}
          className="btn"
        >
          <Link
            className="w-full h-full flex items-center justify-center"
            href={`/admin/Posts?page=${page + 1}`}
          >
            {" "}
            »
          </Link>
        </button>
      </div>
    </div>
  );
}
export default PostLists;
