import CategoryHFlatList from "@/components/Category/CategoryHFlatList";
import CategoryVFlatList from "@/components/Category/CategoryVFlatList";
import MainSlide from "@/components/Category/MainSlide";
import TopTabFlatList from "@/components/Category/TopTabFlatList";
import TopStatusBar from "@/components/TopStatusBar/TopStatusBar";
import { useNewsStore } from "@/stores/news-store";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Index() {
  const { category } = useNewsStore();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <TopStatusBar />
      <TopTabFlatList />
      {category === "home" ? (
        <ScrollView>
          {/*  stickyHeaderIndices={[0]} */}
          <MainSlide />
          <View className="flex flex-col gap-6 py-6">
            {category === "home" &&
              ["top", "business", "entertainment", "technology", "sports"].map(
                (item) => <CategoryHFlatList key={item} category={item} />
              )}
          </View>
        </ScrollView>
      ) : (
        <CategoryVFlatList />
      )}
    </View>
  );
}
