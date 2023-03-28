import CreatePostForm from "./CreatePostForm";

type Props = {};
function Page({}: Props) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-3xl text-center">Create New Post</h2>
      <CreatePostForm />
    </div>
  );
}
export default Page;
