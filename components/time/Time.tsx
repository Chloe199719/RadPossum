type Props = {
  time: string;
};

function Time({ time }: Props) {
  return <span>{`${new Date(parseInt(time)).toLocaleString()}`}</span>;
}
export default Time;
