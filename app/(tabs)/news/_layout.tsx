import { Stack } from "expo-router";
import { View } from "react-native";

export default function NewsLayout() {
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
          name="article/[category]/[id]"
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="categories/[category]"
          options={({ route }) => ({
            headerShown: false,
            // headerShown: true,
            // headerTitle: `${
            //   route?.params?.category as string
            // } News`.toUpperCase(),
            // headerLargeTitle: true,
          })}
        /> */}
      </Stack>
    </View>
  );
}
