import { Text, View } from "react-native";
import { Link } from 'expo-router';
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="color-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Link href="/about">
        Go to About screen
      </Link>
    </View>
  );
}
