// src/providers/counter-store-provider.tsx
// "use client";

// import { type ReactNode, createContext, useRef, useContext } from "react";
// import { useStore } from "zustand";

// import { type NewsStore, createNewsStore } from "@/stores/news-store";

// export type NewsStoreApi = ReturnType<typeof createNewsStore>;

// export const NewsStoreContext = createContext<NewsStoreApi | undefined>(
//   undefined
// );

// export interface NewsStoreProviderProps {
//   children: ReactNode;
// }

// export const NewsStoreProvider = ({ children }: NewsStoreProviderProps) => {
//   const storeRef = useRef<NewsStoreApi | null>(null);
//   if (storeRef.current === null) {
//     storeRef.current = createNewsStore();
//   }

//   return (
//     <NewsStoreContext.Provider value={storeRef.current}>
//       {children}
//     </NewsStoreContext.Provider>
//   );
// };

// export const useNewsStore = <T,>(selector: (store: NewsStore) => T): T => {
//   const newsStoreContext = useContext(NewsStoreContext);

//   if (!newsStoreContext) {
//     throw new Error(`useNewsStore must be used within NewsStoreProvider`);
//   }

//   return useStore(newsStoreContext, selector);
// };
