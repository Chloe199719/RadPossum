import { posts } from "@prisma/client";

type Props = {
  post: posts;
};
function PostItem({ post }: Props) {
  return <div>PostItem</div>;
}
export default PostItem;
