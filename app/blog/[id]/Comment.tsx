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
import PostCommentBox from "./PostCommentBox";
import EditCommentBox from "./EditCommentBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const queryClient = useQueryClient();
  const deleteComment = async function () {
    try {
      const deleteObj = await axios.delete(
        `/api/posts/deleteComment/?commentID=${comment.id}`
      );
      return deleteObj;
    } catch (error) {
      console.log(error);
    }
  };
  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`Comment ${comment.postID}`],
      });
    },
  });

  return (
    <div>
      <div>
        <span>{comment.user.name}</span>
        <span>Post At {`${new Date(comment.createdAT).toLocaleString()}`}</span>
      </div>
      {isEditing ? (
        <EditCommentBox
          autoFocus={true}
          initialValue={comment.message}
          postID={comment.postID}
          commentID={comment.id}
          setisEditing={setIsEditing}
        />
      ) : (
        <div>{comment.message}</div>
      )}
      <div className="flex gap-4">
        <IconBtn
          onClick={() => {
            setIsReplying(!isReplying);
          }}
          isActive={false}
          Icon={FaReply}
          aria-label={false ? "Cancel Reply" : "Reply"}
        />

        {userID === comment.userID && (
          <>
            <IconBtn
              onClick={() => {
                setIsEditing((perv) => !perv);
              }}
              Icon={FaEdit}
              isActive={false}
              aria-label={true ? "Cancel Edit" : `Edit`}
            />
            <IconBtn
              onClick={() => {
                setConfirmDelete(!confirmDelete);
              }}
              Icon={FaTrash}
              aria-label="Delete"
              color="text-red-700"
            />
            {confirmDelete && (
              <div className="flex gap-2 items-center">
                <span className="text-red-600">
                  Are you Sure u Want to Delete?
                </span>
                <button
                  onClick={() => {
                    mutation.mutate();
                  }}
                  className="btn btn-warning btn-sm"
                >
                  YES
                </button>
                <button
                  onClick={() => {
                    setConfirmDelete(false);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  NO
                </button>
              </div>
            )}
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
      {isReplying && (
        <div className="mt-4">
          <PostCommentBox
            postID={comment.postID}
            autoFocus={true}
            parentID={comment.id}
            closeBox={setIsReplying}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <div
          className={`${areChildrenHidden ? `hidden` : `flex`} relative w-full`}
        >
          <button
            className="w-1 h-full bg-primary absolute my-1 hover:bg-accent"
            aria-label="Hide Replies"
            onClick={() => setAreChildrenHidden(true)}
          />
          <div className="ml-10 my-2 w-full">
            {" "}
            <CommentsList comments={childComments} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Comment;
