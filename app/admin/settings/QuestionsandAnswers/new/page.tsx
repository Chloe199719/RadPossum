import FormQA from "./FormQA";

type Props = {};
function page({}: Props) {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl text-center">Create a new Q&A</h2>
      <FormQA />
    </div>
  );
}
export default page;
