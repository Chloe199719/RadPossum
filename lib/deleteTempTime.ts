import pb from "./pocketbase";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const deleteTempTime = function (id: string, sessionID: string) {
  setTimeout(() => {
    pb.collection("booking").delete(id, { APIKEY: "412312312" });
    stripe.checkout.sessions
      .expire(sessionID)
      .then()
      .catch((e: any) => {
        return e;
      });
    console.log(`Deleted`);
  }, 300000);
};

export default deleteTempTime;
