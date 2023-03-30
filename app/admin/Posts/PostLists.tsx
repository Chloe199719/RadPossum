import { posts } from "@prisma/client";
import PostItem from "./PostItem";

type Props = {
  posts: posts[];
};
function PostLists({ posts }: Props) {
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
          «
        </button>
        <button className="btn">Page </button>
        <button
          //   onClick={() => {
          //     setPage(data.length / 10 > page ? page + 1 : page);
          //   }}
          className="btn"
        >
          »
        </button>
      </div>
    </div>
  );
}
export default PostLists;
