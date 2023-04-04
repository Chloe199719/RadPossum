import { Questions } from "@prisma/client";
import ActionsQuestions from "./ActionsQuestions";

type Props = {
  item: Questions;
};
function Item({ item }: Props) {
  return (
    <div className="w-full border-2 border-black py-6 px-2 space-y-3 rounded-xl">
      <div className="space-y-2 px-2">
        {" "}
        <h3 className="text-center text-xl">Question</h3>{" "}
        <p className="text-lg">{item.question}</p>
      </div>
      <hr className="w-full h-[2px] bg-black rounded-lg" />
      <div className="space-y-2 px-2">
        {" "}
        <h3 className="text-center text-xl">Answer</h3>{" "}
        <p className="text-lg">{item.answer}</p>
      </div>
      <hr className="w-full h-[2px] bg-black rounded-lg" />
      <div className="space-y-2 px-2">
        <h3 className="text-center text-xl">Actions</h3>
        <ActionsQuestions id={item.id} />
      </div>
    </div>
  );
}
export default Item;
