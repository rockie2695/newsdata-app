import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ navigationBarColor: "black" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="search" options={{ title: "Search" }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
