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
    <div className="flex flex-col gap-3">
      {" "}
      {comments?.map((comment: comment) => (
        <div key={comment.id} className="w-full flex flex-col ">
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}
export default CommentsList;
