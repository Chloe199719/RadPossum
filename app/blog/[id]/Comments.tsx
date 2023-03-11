"use client";

import { useComment } from "@/components/context/ComentsContext";
import CommentsList from "./CommentsList";

type Props = {
  postID: string;
};
function Comments({ postID }: Props) {
  /* @ts-expect-error */
  const { getReplies, rootComments } = useComment();

  return <CommentsList comments={rootComments} />;
}
export default Comments;
