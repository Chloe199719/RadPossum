"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
type Props = {
  children?: ReactNode;
};

const queryClient = new QueryClient();
function QueryWrapper({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_PUBLIC!,
        }}
      >
        <Toaster />
        {children}
      </PayPalScriptProvider>
    </QueryClientProvider>
  );
}
export default QueryWrapper;
