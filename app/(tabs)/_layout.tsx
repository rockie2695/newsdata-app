import { Tabs } from "expo-router";
import TabBarIcon from "@/components/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "rgb(6 182 212)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} iconName="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="news/index"
        options={{
          title: "News",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} iconName="newspaper" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}