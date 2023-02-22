import pb from "@/lib/pocketbase";

type Props = {};
function CheckoutBtn({}: Props) {
  const onClick = async function () {
    try {
      const test = await fetch("/api/checkout_sessions", {
        method: `POST`,
        body: JSON.stringify({ clientID: pb.authStore.model?.id }),
      });
      const data = await test.json();
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      {pb.authStore.isValid ? (
        <button
          className="py-4 px-10 rounded-xl bg-slate-400"
          onClick={onClick}
        >
          TEST
        </button>
      ) : (
        <p className="text-red-400">Login</p>
      )}
    </>
  );
}
export default CheckoutBtn;
