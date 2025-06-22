import CategoryVFlatList from "@/components/Category/CategoryVFlatList";
import TopTabFlatList from "@/components/Category/TopTabFlatList";
import HomeScrollView from "@/components/Home/HomeScrollView";
import TopStatusBar from "@/components/TopStatusBar/TopStatusBar";
import { useNewsStore } from "@/stores/news-store";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Index() {
  const { category } = useNewsStore();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopStatusBar />
      <TopTabFlatList />
      {category === "home" ? <HomeScrollView /> : <CategoryVFlatList />}
    </View>
  );
}
