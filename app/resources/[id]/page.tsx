import prismaClient from "@/lib/prisma/prismaClient";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { H1, H2, H3, H4, H6, H5 } from "@/components/ReactMarkDown/Headings";
import { Li, Ol, Ul } from "@/components/ReactMarkDown/Lists";
import { A, IMG } from "@/components/ReactMarkDown/LinksImages";
import { PTag } from "@/components/ReactMarkDown/Paragraph";
type Props = {
  params: {
    id: string;
  };
};

const fetchPost = async (id: string) => {
  try {
    // const res = await fetch(
    //   `${process.env.DB_URL}api/collections/resources/records/${id}?expand=urls,audio,images`,
    //   {
    //     next: { revalidate: parseInt(process.env.REVALIDATE!) },
    //   }
    // );
    // if (!res.ok) {
    //   console.log(res);
    // }
    // const data = await res.json();
    const data = await prismaClient.resources.findUnique({
      where: {
        id: id,
      },
      include: {
        audio: true,
      },
    });
    return data;
  } catch (e) {
    console.log(e, "Error");
  }
};

async function Page({ params }: Props) {
  const data = await fetchPost(params.id);
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10">
      <h2 className=" text-4xl">{data?.title}</h2>
      <div className="flex flex-col gap-4 bg-white py-3 px-4 rounded-lg w-full">
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
          className=" flex flex-col gap-1 text-lg tracking-widest"
        >
          {data ? data.body : ``}
        </ReactMarkdown>
        {data?.audio.length !== 0 &&
          data?.audio.map((e) => {
            return (
              <figure className="flex flex-col gap-1" key={e.id}>
                <figcaption>{e.title}</figcaption>
                <audio controls>
                  <source src={e.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </figure>
            );
          })}
      </div>
    </div>
  );
}
export default Page;
export const revalidate = 60;
