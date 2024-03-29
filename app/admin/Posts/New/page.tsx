import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CreatePostForm from "./CreatePostForm";

type Props = {};
function Page({}: Props) {
  return (
    <div className="w-full flex flex-col gap-3 relative">
      <h2 className="text-3xl text-center">Create New Post</h2>
      <Link
        className="absolute left-1 p-2 hover:bg-slate-400 rounded-full"
        href={"/admin"}
      >
        <AiOutlineArrowLeft className=" w-8 h-8 " />
      </Link>
      <CreatePostForm />
    </div>
  );
}
export default Page;
