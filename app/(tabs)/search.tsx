import { Text, View } from "react-native";
import TopStatusBar from "@/components/TopStatusBar/TopStatusBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopStatusBar />
      <Text>Search screen</Text>
    </View>
  );
}
