import { useComment } from "@/components/context/ComentsContext";
import { comment } from "@/types";
import CommentsList from "./CommentsList";
import {
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaReply,
  FaTrash,
  FaListUl,
} from "react-icons/fa";
import IconBtn from "@/components/IconBtn";
import { useState } from "react";

type Props = {
  comment: comment;
};
function Comment({ comment }: Props) {
  /* @ts-expect-error */
  const { getReplies, userID } = useComment();
  const childComments: comment[] = getReplies(comment.id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <div>
        <span>{comment.user.name}</span>
        <span>Post At {`${new Date(comment.createdAT).toLocaleString()}`}</span>
      </div>
      <div>{comment.message}</div>
      <div className="flex gap-4">
        <IconBtn
          isActive={false}
          Icon={FaReply}
          aria-label={false ? "Cancel Reply" : "Reply"}
        />

        {userID === comment.userID && (
          <>
            <IconBtn
              Icon={FaEdit}
              isActive={false}
              aria-label={true ? "Cancel Edit" : `Edit`}
            />
            <IconBtn Icon={FaTrash} aria-label="Delete" color="text-red-400" />
          </>
        )}
        {childComments?.length > 0 && (
          <IconBtn
            Icon={FaListUl}
            aria-label={`Show Reply`}
            onClick={() => setAreChildrenHidden(!areChildrenHidden)}
          />
        )}
      </div>
      {childComments?.length > 0 && (
        <div className={`${areChildrenHidden ? `hidden` : `flex`} relative`}>
          <button
            className="w-1 h-full bg-black absolute mt-1"
            aria-label="Hide Replies"
            onClick={() => setAreChildrenHidden(true)}
          />
          <div className="ml-10 my-2">
            {" "}
            <CommentsList comments={childComments} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Comment;
