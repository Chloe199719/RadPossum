import { comment } from "@/types";
import Comment from "./Comment";

type Props = {
  comments: comment[];
};
function CommentsList({ comments }: Props) {
  if (!comments) {
    return <h2 className=" text-2xl text-center">No Comments Yet</h2>;
  }
  return (
    <>
      {" "}
      {comments?.map((comment: comment) => (
        <div key={comment.id} className="w-full flex flex-col gap-2">
          <Comment comment={comment} />
        </div>
      ))}
    </>
  );
}
export default CommentsList;
