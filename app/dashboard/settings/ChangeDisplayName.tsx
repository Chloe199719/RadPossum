type Props = {};
function ChangeDisplayName({}: Props) {
  return (
    <form className="flex flex-col gap-2 font-mono">
      <div className="flex  items-end justify-center mx-auto gap-4 my-2">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="displayName">New display name</label>
          <input type="text" name="displayName" id="displayName" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="newPassword">Password</label>
          <input type="password" name="newPassword" id="newPassword" />
        </div>{" "}
        <button
          className="w-full py-2 mt-3 px-10 bg-[#30bead] uppercase text-2xl rounded-lg"
          type="submit"
        >
          Change Name
        </button>
      </div>
    </form>
  );
}
export default ChangeDisplayName;
