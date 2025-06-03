import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NewsStoreProvider } from "@/providers/news-store-provider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsStoreProvider>
        <Stack screenOptions={{ navigationBarColor: "black" }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="search" options={{ title: "Search" }} /> */}
        </Stack>
        <StatusBar style="auto" />
      </NewsStoreProvider>
    </QueryClientProvider>
  );
}
