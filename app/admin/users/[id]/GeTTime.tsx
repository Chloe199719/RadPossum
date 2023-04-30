type Props = {
  time: string;
};
function GeTTime({ time }: Props) {
  return <td>{new Date(parseInt(time)).toLocaleString()}</td>;
}
export default GeTTime;
