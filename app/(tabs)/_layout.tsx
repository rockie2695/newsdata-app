import TabBarIcon from "@/components/TabBarIcon";
import { Tabs, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { useEffect } from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        //headerShown: false,
        tabBarStyle: { height: 102 },
        tabBarActiveTintColor: "rgb(6 182 212)",
        tabBarInactiveTintColor: "rgb(107 114 128)",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarButton: ({ children, ...props }) => (
          <Pressable
            {...props}
            android_ripple={{
              borderless: false,
              radius: 50,
              color: "#67e8f9",
            }}
          >
            {children}
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} iconName="newspaper" />
          ),
          tabBarIconStyle: { height: 28 },
          // href: "/news",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} iconName="search" />
          ),
          tabBarIconStyle: { height: 28 },
          // href: "/search",
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
          href: null,
        }}
      />
    </Tabs>
  );
}
