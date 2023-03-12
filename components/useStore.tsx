import { create } from "zustand";

export const useStore = create<{
  count: number;
  sort: string;
}>((set) => ({
  count: 1,
  sort: `desc`,
}));
