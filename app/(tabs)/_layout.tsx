import TabBarIcon from "@/components/TabBarIcon";
import { Tabs } from "expo-router";
import { Pressable, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: "none",
        tabBarActiveTintColor: "rgb(6 182 212)",
        tabBarInactiveTintColor: "rgb(107 114 128)",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarButton: ({ children, ...props }) => (
          <Pressable
            onPress={props.onPress}
            onPressIn={props.onPressIn}
            onPressOut={props.onPressOut}
            style={props.style}
            disabled={props.disabled}
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
        name="index"
        options={{
          title: "News",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} iconName="newspaper" />
          ),
          tabBarIconStyle: { height: 28 },
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
        }}
      />
    </Tabs>
  );
}
