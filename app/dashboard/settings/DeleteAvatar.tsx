import { useStore } from "@/components/useStore";
import pb from "@/lib/pocketbase";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};
function DeleteAvatar({}: Props) {
  const [confirm, setConfirm] = useState(false);
  const onConfim = async function () {
    try {
      const action = await pb
        .collection("users") /* @ts-expect-error */
        .update(pb.authStore.model?.id, {
          avatar: null,
        });
      useStore.setState({ count: Math.random() });
      toast.success(`We Removed Your Avatar`);
      setConfirm(false);
    } catch (error) {}
  };
  return (
    <div>
      <button
        onClick={() => {
          setConfirm(true);
        }}
        className="btn"
      >
        Delete Current Avatar
      </button>
      {confirm ? (
        <div className="btn-group">
          <button onClick={onConfim} className="btn btn-warning">
            Confirm
          </button>
          <button
            onClick={() => {
              setConfirm(false);
            }}
            className="btn btn-info"
          >
            Go Back
          </button>
        </div>
      ) : null}
    </div>
  );
}
export default DeleteAvatar;
