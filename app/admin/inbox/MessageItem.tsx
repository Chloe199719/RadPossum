import { Message } from "@/types";

type Props = {
  message: Message;
};
function MessageItem({ message }: Props) {
  return <div className="flex-1 w-full">MessageItem</div>;
}
export default MessageItem;
