import { Post } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { H1, H2, H3, H4, H6, H5 } from "@/components/ReactMarkDown/Headings";
import { Li, Ol, Ul } from "@/components/ReactMarkDown/Lists";
import { A, IMG } from "@/components/ReactMarkDown/LinksImages";
import { PTag } from "@/components/ReactMarkDown/Paragraph";
import Actions from "./Actions";
type Props = {
  post: Post;
};
function PostItem({ post }: Props) {
  return (
    <div className="flex-1 space-y-10 my-5 flex flex-col items-center">
      <h2 className="text-center text-2xl">{post.title}</h2>
      <article className="bg-white py-6 rounded-lg px-1 md:px-4 w-[95%] ">
        <ReactMarkdown
          components={{
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            h5: H5,
            h6: H6,
            ul: Ul,
            ol: Ol,
            li: Li,
            a: (a) => {
              return <A href={a.href!}>{a.children}</A>;
            },
            img: (a) => {
              return <IMG src={a.src!} alt={a.alt!} />;
            },
            p: PTag,
          }}
          remarkPlugins={[remarkGfm]}
          className="flex flex-col gap-1 px-2 md:px-10"
        >
          {`${post.message.split(" ").slice(0, 200).join(" ")}${
            post.message.split(" ").length > 200 ? "..." : ""
          }`}
        </ReactMarkdown>
      </article>
      <Actions postID={post.id} />
      <hr className="h-[2px] bg-black my-2" />
    </div>
  );
}
export default PostItem;
