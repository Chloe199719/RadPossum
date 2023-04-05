import prismaClient from "@/lib/prisma/prismaClient";
import ListSocial from "./listsocial";

async function fetchSocials() {
  try {
    const res = await prismaClient.socialMedia.findMany();
    return res;
  } catch (error) {
    return null;
  }
}

type Props = {};
async function Page({}: Props) {
  const data = await fetchSocials();

  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl text-center">Social Medias</h2>
      <ListSocial data={data!} />
    </div>
  );
}
export default Page;
