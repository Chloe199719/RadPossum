"use client";
import pb from "@/lib/pocketbase";
import ChangeDisplayName from "./ChangeDisplayName";
import ChangePassword from "./ChangePassword";

type Props = {};
function Settings({}: Props) {
  const userInfo = pb.authStore.model;
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10">
      <div className="  flex justify-center">
        <h2 className="text-5xl">Settings {userInfo?.name}</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 w-full p-2">
        <h3 className=" text-3xl">Change Password</h3>
        <ChangePassword />
        <h3 className=" text-3xl">Change Display Name</h3>
        <ChangeDisplayName />
      </div>{" "}
    </div>
  );
}
export default Settings;
