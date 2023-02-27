import deleteTempTimeLive from "@/lib/deleteTempTimeLive";
import { redirect } from "next/navigation";

type Props = {};

type searchParam = {
  searchParams: {
    session_id: string;
    temp_time: string;
  };
};
export default async function Page({ searchParams }: any, props: Props) {
  if (searchParams.session_id && searchParams.temp_time) {
    await deleteTempTimeLive(searchParams.temp_time, searchParams.session_id);
  }

  setTimeout(redirect(`/booking`), 20000); // Maybe Redirect Maybe make Cancel Page
  return <div>more test</div>;
}
