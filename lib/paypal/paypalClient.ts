import paypal from "@paypal/checkout-server-sdk";

// const Environment =
//   process.env.NODE_ENV === "production"
//     ? paypal.core.LiveEnvironment
//     : paypal.core.SandboxEnvironment;
const Environment = paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.NEXT_PUBLIC_PAYPAL_PUBLIC!,
    process.env.PAYPAL_SECRET!
  )
);

export default paypalClient;
