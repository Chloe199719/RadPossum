import prismaClient from "@/lib/prisma/prismaClient";

async function fetchMessages() {
  try {
    const data = await prismaClient.messages.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}

type Props = {};
async function Page({}: Props) {
  const data = await fetchMessages();
  if (!data) return <div>Error Getting Messages or No Messages </div>;
  return (
    <div>
      <h2 className="text-center text-4xl">Messages List</h2>{" "}
    </div>
  );
}
export default Page;
