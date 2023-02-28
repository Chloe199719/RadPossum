import { PayPalButtons } from "@paypal/react-paypal-js";
import { rejects } from "assert";

type Props = {
  date: Date;
  selHour: string;
  paypalID: {
    id: string;
    private_id: string;
    title: string;
    privacy: string;
    duration: string;
  }[];
  privacy: string;
  duration: string;
};
function PaypalBtn({ date, selHour, paypalID, privacy, duration }: Props) {
  const getProdID = function () {
    let id = "";
    paypalID.forEach((e) => {
      if (e.duration === duration && e.privacy === privacy) {
        id = e.private_id;
      }
    });

    return id;
  };
  const createOrder = async function () {
    try {
      const res = await fetch(`/api/createPayPalOrder`, {
        method: "POST",
        headers: { "Content-type": `application/json` },
        body: JSON.stringify({
          item: getProdID(),
          date: date,
          selHour: selHour,
        }),
      });
      const data: Promise<string> = res.json();
      console.log(data);
      return data;
    } catch (error: any) {
      //   return Promise.reject(error.message);
    }
  };

  return (
    <>
      <PayPalButtons
        fundingSource="paypal"
        style={{ shape: `pill`, label: `buynow`, height: 55 }}
        createOrder={async () => {
          await createOrder().then((id) => {
            console.log(id.id);
            return id.id;
          });
        }}
      />
    </>
  );
}
export default PaypalBtn;
