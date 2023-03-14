type Props = {
  children: any;
};
function H1({ children }: Props) {
  return <h1 className="text-black text-2xl">{children}</h1>;
}
function H2({ children }: Props) {
  return <h2 className="text-blue-200 text-4xl">{children}</h2>;
}
function H3({ children }: Props) {
  return <h3 className="text-blue-300 text-4xl">{children}</h3>;
}
function H4({ children }: Props) {
  return <h4 className="text-blue-400 text-4xl">{children}</h4>;
}
function H5({ children }: Props) {
  return <h5 className="text-blue-500 text-4xl">{children}</h5>;
}
function H6({ children }: Props) {
  return <h6 className="text-blue-600 text-4xl">{children}</h6>;
}
export { H1, H2, H3, H4, H6, H5 };
