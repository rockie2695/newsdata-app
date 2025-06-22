import TabBarIcon from "@/components/BottomTabBar/TabBarIcon";
import { Tabs } from "expo-router";
import { Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 52 + insets.bottom },
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
          title: t("news"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} iconName="newspaper" />
          ),
          tabBarIconStyle: { height: 28, width: 56 },
          // href: "/news",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t("search"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} iconName="search" />
          ),
          tabBarIconStyle: { height: 28, width: 56 },
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
