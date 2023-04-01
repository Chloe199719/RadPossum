import prismaClient from "@/lib/prisma/prismaClient";
import MessageList from "./Messagelist";

async function fetchMessages(index: number) {
  try {
    const data = await prismaClient.messages.findMany({
      take: 10,
      skip: (index - 1) * 10,
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}
type Props = {
  searchParams: {
    page: string;
  };
};

async function Page({ searchParams }: Props) {
  const data = await fetchMessages(
    searchParams.page ? parseInt(searchParams.page) : 1
  );

  if (!data) return <div>Error Getting Messages or No Messages </div>;
  return (
    <div className=" space-y-6 w-full">
      <h2 className="text-center text-4xl">Messages List</h2>{" "}
      <MessageList
        searchParams={searchParams}
        messages={data.map((e) => {
          return {
            id: e.id,
            name: e.name,
            email: e.email,
            message: e.message,
            pronouns: e.pronouns,
            readSolved: e.readSolved,
            createdAt: e.createdAt.getTime(),
            discordID: e.discordID,
          };
        })}
      />
    </div>
  );
}
export default Page;
