type Props = {
  children: any;
};
function H1({ children }: Props) {
  return <h1 className="">{children}</h1>;
}
function H2({ children }: Props) {
  return <h2 className="">{children}</h2>;
}
function H3({ children }: Props) {
  return <h3 className="">{children}</h3>;
}
function H4({ children }: Props) {
  return <h4 className="">{children}</h4>;
}
function H5({ children }: Props) {
  return <h5 className="">{children}</h5>;
}
function H6({ children }: Props) {
  return <h6 className="">{children}</h6>;
}
export { H1, H2, H3, H4, H6, H5 };
