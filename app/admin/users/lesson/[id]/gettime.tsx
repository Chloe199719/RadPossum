type Props = {
  time: string;
};
function GeTTime({ time }: Props) {
  return <span>{new Date(parseInt(time)).toLocaleString()}</span>;
}
export default GeTTime;
