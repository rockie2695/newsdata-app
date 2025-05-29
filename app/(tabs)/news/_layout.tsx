import { Stack, useFocusEffect } from "expo-router";
import { View } from "react-native";

export default function NewsLayout() {
  useFocusEffect(() => {
    console.log("here2");
    const onBeforeUnload = (e: any) => {
      // run your cleanup code here
      console.log("here check 2");
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="categories/[category]"
          options={({ route }) => ({
            headerShown: true,
            headerTitle: `${
              route?.params?.category as string
            } News`.toUpperCase(),
            headerLargeTitle: true,
          })}
        />
      </Stack>
    </View>
  );
}
