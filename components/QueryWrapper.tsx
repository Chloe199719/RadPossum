"use client";
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
      <Toaster />
      {children}
    </QueryClientProvider>
  );
}
export default QueryWrapper;
