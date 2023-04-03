import prismaClient from "@/lib/prisma/prismaClient";
import FormHero from "./FormHero";

async function fetchCurrentHero() {
  const data = await prismaClient.hero.findFirst({});
  return data;
}

type Props = {};
async function Page({}: Props) {
  const data = await fetchCurrentHero();
  if (!data) return <div>no data</div>;
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <h2 className=" text-4xl">Editing Hero</h2>
      <FormHero hero={data!} />
    </div>
  );
}
export default Page;
