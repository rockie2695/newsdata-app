import SearchNews from "@/components/Search/SearchNews";
import TopStatusBar from "@/components/TopStatusBar/TopStatusBar";

import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopStatusBar />
      <SearchNews />
    </View>
  );
}
