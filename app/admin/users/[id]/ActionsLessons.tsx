import Link from "next/link";
import { BsPencilFill } from "react-icons/bs";

type Props = {
  id: string;
};
function ActionsLessons({ id }: Props) {
  return (
    <div>
      <Link href={`/admin/users/lesson/${id}`}>
        <BsPencilFill className="h-6 w-6 hover:text-slate-600 active:text-blue-600" />
      </Link>
    </div>
  );
}
export default ActionsLessons;
