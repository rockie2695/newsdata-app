import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  color: string;
  iconName?: string;
}

const TabBarIcon = ({
  focused,
  color,
  iconName = "newspaper",
}: TabBarIconProps) => {
  return (
    <View
      className={`${
        focused ? "bg-cyan-500" : "bg-transparent"
      } px-2 py-[2px] rounded-md w-12 flex items-center justify-center`}
    >
      <FontAwesome5
        name={iconName}
        color={focused ? "white" : color}
        size={24}
      />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        tabBarActiveTintColor: "rgb(6 182 212)",
        tabBarInactiveTintColor: "rgb(107 114 128)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "News",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} iconName="newspaper" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} iconName="search" />
          ),
        }}
      />
    </Tabs>
  );
}
