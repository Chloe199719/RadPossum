import pb from "./pocketbase";
import stripe from "./stripe";

async function work(id: string, sessionID: string) {
  try {
    await pb.collection("booking").delete(id, { APIKEY: "412312312" });
  } catch (error) {}

  try {
    const checkif = await stripe.checkout.sessions.retrieve(sessionID);
    if (checkif.status === "expired") return console.log(`Worked`);
    await stripe.checkout.sessions.expire(sessionID);
  } catch (error) {}
  // stripe.checkout.sessions
  //   .expire(sessionID)
  //   .then()
  //   .catch((e: any) => {
  //     return e;
  //   });
  console.log(`Deleted1`);
}

const deleteTempTime = function (id: string, sessionID: string) {
  setTimeout(() => {
    work(id, sessionID);
  }, 1800000);
};

export default deleteTempTime;
