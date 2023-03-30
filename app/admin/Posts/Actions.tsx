import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type Props = {
  postID: string;
};
function Actions({}: Props) {
  return (
    <div className="flex-1 flex justify-end w-full px-12 gap-2">
      <div className="tooltip  tooltip-left" data-tip="Edit Post">
        <AiOutlineEdit className="w-8 h-8" />
      </div>
      <div className="tooltip  tooltip-left" data-tip="Delete">
        <AiOutlineDelete className="w-8 h-8" />
      </div>

      <div>Actions</div>
    </div>
  );
}
export default Actions;
