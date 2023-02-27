import pb from "./pocketbase";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const deleteTempTimeLive = async function (id: string, sessionID: string) {
  try {
    await pb.collection("booking").delete(id, { APIKEY: "412312312" });
  } catch (error) {} // Error Expected if  Already Deleted

  const checkif = await stripe.checkout.sessions.retrieve(sessionID);
  if (checkif.status === "expired") return console.log(`Worked`);
  stripe.checkout.sessions
    .expire(sessionID)
    .then()
    .catch((e: any) => {
      return e;
    });
  console.log(`Deleted`);
};

export default deleteTempTimeLive;
