import { Dispatch, SetStateAction } from "react";
import { BsFillEraserFill, BsPencilFill } from "react-icons/bs";
import { HiBan } from "react-icons/hi";

type Props = {
  setEdit: Dispatch<SetStateAction<boolean>>;
};
function Actions({ setEdit }: Props) {
  return (
    <div className="flex gap-2">
      <BsPencilFill
        onClick={() => {
          setEdit(true);
        }}
        className="h-6 w-6 hover:text-slate-600 active:text-blue-600"
      />{" "}
      <BsFillEraserFill className="h-6 w-6 hover:text-slate-600 active:text-blue-600" />
    </div>
  );
}
export default Actions;
