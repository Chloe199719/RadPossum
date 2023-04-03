import prismaClient from "@/lib/prisma/prismaClient";
import FormAbout from "./FormAbout";

type Props = {};

async function fetchAbouts() {
  try {
    const data = await prismaClient.aboutme.findMany({});
    return data;
  } catch (error) {
    return null;
  }
}

async function page({}: Props) {
  const data = await fetchAbouts();

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h2 className="text-3xl">Editing About</h2>
      <FormAbout about={data!} />
    </div>
  );
}
export default page;
