import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import prismaClient from "@/lib/prisma/prismaClient";
import { H1, H2, H3, H4, H6, H5 } from "@/components/ReactMarkDown/Headings";
import { Li, Ol, Ul } from "@/components/ReactMarkDown/Lists";
import { A, IMG } from "@/components/ReactMarkDown/LinksImages";
import { PTag } from "@/components/ReactMarkDown/Paragraph";

const fetchResources = async () => {
  try {
    // const res = await fetch(
    //   `${process.env.DB_URL}api/collections/resources/records/`,
    //   {
    //     method: `get`,
    //     next: { revalidate: 100 },
    //   }
    // );
    // if (!res.ok) {
    //   console.log(res);
    // }
    // const data = await res.json();
    const data = await prismaClient.resources.findFirst({
      include: {
        audio: true,
      },
      orderBy: [{ updatedAT: `desc` }],
      take: 1,
    });
    return data;
  } catch (e) {
    console.log(e, "Error");
  }
};

type Props = {};
async function Page({}: Props) {
  const resource = await fetchResources();
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10">
      <h2 className=" text-4xl">{resource?.title!}</h2>
      <div className="flex flex-col gap-4 bg-white px-4 py-3 rounded-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="text-lg tracking-widest flex flex-col gap-1 text-black"
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
        >
          {resource ? resource.body : ``}
        </ReactMarkdown>
        {resource?.audio.length !== 0 &&
          resource?.audio.map((e) => {
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
