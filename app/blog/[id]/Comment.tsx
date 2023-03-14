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
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react";

type Props = {
  comment: comment;
  index: number;
};
function Comment({ comment, index }: Props) {
  /* @ts-expect-error */
  const { getReplies } = useComment();
  const childComments: comment[] = getReplies(comment.id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(
    index >= 3 ? true : false
  );
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
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
  const ilikethis = function () {
    return comment.Like.some((like) => {
      /* @ts-expect-error */
      if (like.userId === session?.user.id) {
        return true;
      } else {
        return false;
      }
    });
  };
  const Liked = ilikethis();
  const toggleLike = async function () {
    try {
      const toggleLikes = await axios.put(`/api/posts/toggleLike`, {
        toggleLike: toggleLike,
        commentID: comment.id,
      });
      return toggleLikes;
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLikeMutation = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`Comment ${comment.postID}`],
      });
    },
  });
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          {" "}
          <Image
            className=" rounded-full"
            src={comment.user.image ? comment.user.image : "/chloe.jpg"}
            alt={comment.user.image ? comment.user.name : "Default Profile Pic"}
            width={35}
            height={35}
          />
          <span className="text-black text-lg">{comment.user.name}</span>
          {comment.edited && (
            <span
              className="tooltip tooltip-right"
              data-tip={`Last Edited at: ${new Date(
                comment.updatedAT
              ).toLocaleString()}`}
            >
              Edited
            </span>
          )}
        </span>
        <span>
          Posted At {`${new Date(comment.createdAT).toLocaleString()}`}
        </span>
      </div>
      <div className="flex flex-col gap-2 ml-10">
        {isEditing ? (
          <EditCommentBox
            autoFocus={true}
            initialValue={comment.message}
            postID={comment.postID}
            commentID={comment.id}
            setisEditing={setIsEditing}
          />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="text-black bg-slate-50 px-2 py-3 rounded-lg"
          >
            {comment.message}
          </ReactMarkdown>
        )}
        <div className="flex gap-4 text-black">
          {status === "authenticated" && (
            <IconBtn
              onClick={() => {
                setIsReplying(!isReplying);
              }}
              isActive={false}
              Icon={FaReply}
              aria-label={false ? "Cancel Reply" : "Reply"}
            />
          )}
          {/* @ts-expect-error */}
          {session?.user?.id! === comment.userID && (
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
            <div className="flex gap-2 items-center">
              <IconBtn
                Icon={FaListUl}
                aria-label={`Show Reply`}
                onClick={() => setAreChildrenHidden(!areChildrenHidden)}
              />{" "}
              {areChildrenHidden && <span>{childComments.length}</span>}
            </div>
          )}
          <div
            className="flex items-center text-red-500 gap-2 tooltip tooltip-success tooltip-right"
            data-tip={comment.Like.map((like) => {
              return like.user.name;
            }).join(`, `)}
          >
            <IconBtn
              Icon={Liked ? FaHeart : FaRegHeart}
              aria-label={`Like or  Dislike`}
              disabled={status === "authenticated" ? false : true}
              onClick={() => {
                toggleLikeMutation.mutate();
              }}
            />
            <span>{comment.Like.length}</span>
          </div>
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
          <div className={`${areChildrenHidden ? `hidden` : `flex`}  w-full`}>
            <button
              className="w-1 h-[calc(100%-50px)] bg-primary absolute my-1 hover:bg-accent left-3 top-10 bottom-0"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="ml-10 my-2 w-full">
              {" "}
              <CommentsList index={index + 1} comments={childComments} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Comment;
