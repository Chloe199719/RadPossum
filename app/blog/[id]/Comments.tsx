"use client";

import { useComment } from "@/components/context/ComentsContext";
import { useStore } from "@/components/useStore";
import { useQueryClient } from "@tanstack/react-query";

import CommentsList from "./CommentsList";

type Props = {
  postID: string;
};
function Comments({ postID }: Props) {
  /* @ts-expect-error */
  const { getReplies, rootComments } = useComment();
  const queryClient = useQueryClient();
  const store = useStore();
  return (
    <div className="w-full">
      <div className="text-xl flex justify-end gap-3">
        <span
          className={`${store.sort === "asc" ? `text-primary` : ``}`}
          onClick={() => {
            useStore.setState({ sort: `asc` });
            setTimeout(() => {
              queryClient.invalidateQueries({
                queryKey: [`Comment ${postID}`],
              });
            }, 10);
          }}
        >
          Ascended
        </span>{" "}
        <span
          onClick={() => {
            useStore.setState({ sort: `desc` });
            setTimeout(() => {
              queryClient.invalidateQueries({
                queryKey: [`Comment ${postID}`],
              });
            }, 10);
          }}
          className={`${store.sort === "desc" ? `text-primary` : ``}`}
        >
          Descend
        </span>
      </div>
      <CommentsList comments={rootComments} />
    </div>
  );
}
export default Comments;
