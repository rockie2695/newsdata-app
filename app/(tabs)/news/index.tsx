import CategoryHFlatList from "@/components/Category/CategoryHFlatList";
import CategoryVFlatList from "@/components/Category/CategoryVFlatList";
import MainSlide from "@/components/Category/MainSlide";
import TopTabFlatList from "@/components/Category/TopTabFlatList";
import { useNewsStore } from "@/stores/news-store";
import { ScrollView, StatusBar, Text, View } from "react-native";
export default function Index() {
  const { category } = useNewsStore();
  return (
    <>
      <TopTabFlatList />
      {category === "home" ? (
        <ScrollView>
          {/*  stickyHeaderIndices={[0]} */}
          <MainSlide />
          <View className="flex flex-col gap-6 py-6">
            {category === "home" &&
              ["top", "business", "entertainment", "sports", "technology"].map(
                (item) => <CategoryHFlatList key={item} category={item} />
              )}
          </View>
        </ScrollView>
      ) : (
        <CategoryVFlatList />
      )}
    </>
  );
}
