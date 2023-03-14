type Props = {
  children: any;
};
function Ul({ children }: Props) {
  return <ul>{children}</ul>;
}
function Li({ children }: Props) {
  return <li>{children}</li>;
}

function Ol({ children }: Props) {
  return <ol>{children}</ol>;
}

export { Ul, Li, Ol };
