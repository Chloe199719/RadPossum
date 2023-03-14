type Props = {
  children: any;
};
function PTag({ children }: Props) {
  return <p className="flex justify-center">{children}</p>;
}
export { PTag };
