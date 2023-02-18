import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

type Props = {
  params: {
    id: string;
  };
};

const fetchPost = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/resources/records/${id}?expand=urls,audio`,
      {
        next: { revalidate: 100 },
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

async function Page({ params }: Props) {
  const data = await fetchPost(params.id);

  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10">
      Page SLUG
      <div>
        {data.body?.map((e: any, i: string) => {
          return <p dangerouslySetInnerHTML={{ __html: e }} key={i}></p>;
        })}
        {data?.expand?.urls.map((e: any) => {
          return (
            <a className="text-red-800" key={e.id} href={e.url}>
              {e.link_Description}
            </a>
          );
        })}
        {data.expand?.audio.map((e: any) => {
          return (
            <audio controls key={e.id}>
              <source src={e.soundurl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          );
        })}
      </div>
    </div>
  );
}
export default Page;
