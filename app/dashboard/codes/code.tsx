import { isValid } from "zod";

type Props = {
  code: {
    userID: string;
    id: string;
    code: string;
    used: boolean;
    isValid: boolean;
    time: string;
    public_or_private: string;
  };
};
function Code({ code }: Props) {
  return (
    <tr className="hover">
      <td>{code.public_or_private}</td>
      <td>{code.time}</td>
      <td
        className={`${
          code.isValid && !code.used ? "bg-green-400" : "bg-red-400"
        }`}
      >
        {code.code}
      </td>
    </tr>
  );
}
export default Code;
