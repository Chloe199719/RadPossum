import ChangeDisplayName from "./ChangeDisplayName";

type Props = {};
function Settings({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-6 flex-1 px-10">
      <div className="  flex justify-center">
        <h2 className="text-5xl">Settings</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 w-full p-2">
        {/* <h3 className=" text-3xl">Change Password</h3>
        <ChangePassword /> */}
        <h3 className=" text-3xl">Change Display Name</h3>
        <ChangeDisplayName />
        {/* <h3 className=" text-3xl">Upload an Avatar</h3> */}
        {/* <AvatarUpload />
        {pb.authStore.model?.avatar ? <DeleteAvatar /> : null} */}
      </div>{" "}
    </div>
  );
}
export default Settings;
