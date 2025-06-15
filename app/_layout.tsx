import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/scripts/i18n";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ navigationBarColor: "white" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="search" options={{ title: "Search" }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
