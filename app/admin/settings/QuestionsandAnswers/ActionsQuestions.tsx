import { BsFillEraserFill, BsPencilFill } from "react-icons/bs";

type Props = {
  id: string;
};
function ActionsQuestions({ id }: Props) {
  return (
    <div className="flex justify-end w-full space-x-3">
      <BsPencilFill className="h-6 w-6 hover:text-slate-600 active:text-blue-600" />
      <BsFillEraserFill className="h-6 w-6 text-red-600 hover:text-red-400 active:text-red-800" />
    </div>
  );
}
export default ActionsQuestions;
