type Props = {
  time: string;
};
function GeTTime({ time }: Props) {
  return (
    <td className="text-center">{new Date(parseInt(time)).toLocaleString()}</td>
  );
}
export default GeTTime;
