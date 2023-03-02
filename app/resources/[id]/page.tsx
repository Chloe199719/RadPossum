import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
type Props = {
  params: {
    id: string;
  };
};

const fetchPost = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/resources/records/${id}?expand=urls,audio,images`,
      {
        next: { revalidate: parseInt(process.env.REVALIDATE!) },
      }
    );
    if (!res.ok) {
      console.log(res);
    }
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e, "Error");
  }
};
[
  `this is a great exercise for maintaining vocal fold closure while also breaking into higher pitches and maintaining stabilized vocal folds here's a clip of me doing the whimpers and progressively using lower airflow to get even lower on vocal weight`,
];
async function Page({ params }: Props) {
  const test = `A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  `;
  const data = await fetchPost(params.id);
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10">
      <h2 className=" text-4xl">{data?.title}</h2>
      <div className="flex flex-col gap-4">
        <ReactMarkdown className="test">{data.body}</ReactMarkdown>

        {/* {data.body?.map((e: string, i: string) => {
          return (
            <p className=" text-lg tracking-wide" key={i}>
              {e}
            </p>
          );
        })}
        {data?.expand?.urls?.map((e: any) => {
          return (
            <Link className="text-red-800" key={e.id} href={e.url}>
              {e.link_Description}
            </Link>
          );
        })}
        {data.expand?.audio?.map((e: any) => {
          return (
            <figure className="flex flex-col gap-1" key={e.id}>
              <figcaption>{e.title}</figcaption>
              <audio controls>
                <source src={e.soundurl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </figure>
          );
        })}
        {data.expand?.images?.map((e: any) => {
          return (
            <Image
              key={e.id}
              src={e.image_url}
              alt={e.alt_text}
              width={500}
              height={500}
            />
          );
        })} */}
      </div>
    </div>
  );
}
export default Page;
