import { useComment } from "@/components/context/ComentsContext";
import { comment } from "@/types";

type Props = {
  comment: comment;
};
function Comment({ comment }: Props) {
  /* @ts-expect-error */
  const { getReplies } = useComment();
  const childComments = getReplies(comment.id);
  return (
    <div>
      <div>
        <span>{comment.user.name}</span>
        <span>Post At {`${new Date(comment.createdAT).toLocaleString()}`}</span>
      </div>
      <div>{comment.message}</div>
    </div>
  );
}
export default Comment;
