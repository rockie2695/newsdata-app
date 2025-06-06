import { Text, ScrollView, View } from "react-native";
import TopTabFlatList from "@/components/Category/TopTabFlatList";
import MainSlide from "@/components/Category/MainSlide";
import { useNewsStore } from "@/providers/news-store-provider";
import CategoryFlatList from "@/components/Category/CategoryFlatList";
export default function Index() {
  const category = useNewsStore((state) => state.category);
  return (
    <ScrollView>
      <TopTabFlatList />
      <Text>Category screen {category}</Text>
      <MainSlide />
      <View className="flex flex-col gap-6 py-6">
        {category === "home" &&
          ["top", "business", "entertainment", "sports", "technology"].map(
            (item) => <CategoryFlatList key={item} category={item} />
          )}
      </View>
    </ScrollView>
  );
}
