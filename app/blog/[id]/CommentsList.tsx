import { comment } from "@/types";
import Comment from "./Comment";

type Props = {
  comments: comment[];
};
function CommentsList({ comments }: Props) {
  return (
    <>
      {" "}
      {comments.map((comment: comment) => (
        <div key={comment.id} className="comment-stack">
          <Comment comment={comment} />
        </div>
      ))}
    </>
  );
}
export default CommentsList;
