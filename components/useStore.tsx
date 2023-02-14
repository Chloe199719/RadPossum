import { create } from "zustand";

export const useStore = create<{
  count: number;
}>((set) => ({
  count: 1,
}));
