import prismaClient from "@/lib/prisma/prismaClient";
import GiftCodeForm from "./GiftCodeForm";

type Props = {
  params: {
    id: string;
  };
};
async function getUserName(id: string) {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}

async function page({ params }: Props) {
  const user = await getUserName(params.id);
  if (!user)
    return (
      <div className="w-full">
        {" "}
        <h2 className="text-4xl">User Not Found</h2>{" "}
      </div>
    );
  return (
    <div className="w-full space-y-6">
      <h2 className="text-4xl text-center">Gifting a Code to {user?.name}</h2>
      <GiftCodeForm id={params.id} />
    </div>
  );
}
export default page;
