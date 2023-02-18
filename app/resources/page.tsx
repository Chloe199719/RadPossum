"use client";
import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

type Props = {};
function Page({}: Props) {
  // const lessonQuery = useQuery({
  //   queryKey: [`resources`],
  //   queryFn: () =>
  //     pb.collection(`test123`).getList(1, 250, {
  //       $autoCancel: false,
  //     }),
  // });
  // console.log(lessonQuery.data);
  return (
    <div>
      Page
      {/* {lessonQuery.data?.items[0].body.map((e: any, i: number) => {
        return <p key={i}>{e}</p>;
      })} */}
    </div>
  );
}
export default Page;
