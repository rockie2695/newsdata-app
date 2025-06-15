// src/stores/counter-store.ts
// import { createStore } from "zustand/vanilla";

// export type NewsState = {
//   category: string;
// };

// export type NewsActions = {
//   setCategory: (category: string) => void;
// };

// export type NewsStore = NewsState & NewsActions;

// export const defaultInitState: NewsState = {
//   category: "home",
// };

// export const createNewsStore = (initState: NewsState = defaultInitState) => {
//   return createStore<NewsStore>()((set) => ({
//     ...initState,
//     setCategory: (category: string) => set(() => ({ category })),
//   }));
// };

"use client";

import { create } from "zustand";

interface NewsStore {
  category: string;
  setCategory: (category: string) => void;
}

const useNewsStore = create<NewsStore>()((set) => ({
  category: "home",
  setCategory: (category: string) => set(() => ({ category })),
}));

export { useNewsStore };
