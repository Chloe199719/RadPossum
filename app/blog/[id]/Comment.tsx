import { useComment } from "@/components/context/ComentsContext";
import { comment } from "@/types";
import CommentsList from "./CommentsList";

type Props = {
  comment: comment;
};
function Comment({ comment }: Props) {
  /* @ts-expect-error */
  const { getReplies } = useComment();
  const childComments: comment[] = getReplies(comment.id);
  console.log(childComments);
  return (
    <div>
      <div>
        <span>{comment.user.name}</span>
        <span>Post At {`${new Date(comment.createdAT).toLocaleString()}`}</span>
      </div>
      <div>{comment.message}</div>
      <div className="ml-10 my-2">
        {" "}
        {childComments?.length > 0 && <CommentsList comments={childComments} />}
      </div>
    </div>
  );
}
export default Comment;
