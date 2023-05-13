import About from "../About";

type Props = {};
function page({}: Props) {
  /* @ts-expect-error */
  return <About />;
}
export default page;
