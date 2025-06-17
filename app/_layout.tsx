import "../global.css";

import { Stack } from "expo-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, Platform, StatusBar } from "react-native";

import * as NavigationBar from "expo-navigation-bar";

import "@/scripts/i18n";

import { NotoSansHK_400Regular } from '@expo-google-fonts/noto-sans-hk/400Regular';
import { NotoSansHK_700Bold } from '@expo-google-fonts/noto-sans-hk/700Bold';

const queryClient = new QueryClient();

const setNavigationBarStyle = async () => {
  if (Platform.OS === "android") {
    NavigationBar?.setStyle?.("light");
    await NavigationBar?.setButtonStyleAsync("dark");
    await NavigationBar?.setVisibilityAsync("visible");
    StatusBar.setBackgroundColor("white");
    StatusBar.setBarStyle("dark-content");
  }
};

export default function RootLayout() {
  useEffect(() => {
    // Set initial style
    setNavigationBarStyle();

    // Add app state change listener
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        setNavigationBarStyle();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="search" options={{ title: "Search" }} /> */}
      </Stack>
    </QueryClientProvider>
  );
}
