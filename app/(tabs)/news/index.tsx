import { Text, ScrollView } from "react-native";
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
      {category === "home" &&
        [
          "top",
          "business",
          "entertainment",
          "sports",
          "technology",
        ].map((item) => <CategoryFlatList key={item} category={item} />)}
    </ScrollView>
  );
}
