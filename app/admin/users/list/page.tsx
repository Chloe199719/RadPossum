import prismaClient from "@/lib/prisma/prismaClient";
import UserList from "./UserList";

async function getAllUsers(index: number) {
  try {
    const data = await prismaClient.user.findMany({
      take: 10,
      skip: (index - 1) * 10,
      orderBy: {
        name: "asc",
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
async function page({ searchParams }: Props) {
  const users = await getAllUsers(
    searchParams.page ? parseInt(searchParams.page) : 1
  );
  if (!users)
    return <h2 className="text-4xl">Error Getting Users or No Users </h2>;
  return (
    <div className=" space-y-6 w-full">
      <h2 className="text-center text-4xl">User List</h2>{" "}
      <UserList users={users!} searchParams={searchParams} />
    </div>
  );
}
export default page;
