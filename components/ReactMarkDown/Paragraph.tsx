type Props = {
  children: any;
};
function PTag({ children }: Props) {
  return <p className="tracking-widest">{children}</p>;
}
export { PTag };
