import { Text } from "react-native";
import TopStatusBar from "@/components/TopStatusBar/TopStatusBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1">
      <TopStatusBar />
      <Text>Search screen</Text>
    </SafeAreaView>
  );
}
