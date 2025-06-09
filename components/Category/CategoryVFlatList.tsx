import { useNewsStore } from "@/providers/news-store-provider";
import { FlatList, View } from "react-native";
import MainSlide from "./MainSlide";
import TopTabFlatList from "./TopTabFlatList";
import { news } from "@/scripts/api";
import { useFetchInfReactQuery } from "@/hook/useInfReactQuery";

export default function CategoryVFlatList() {
  const category = useNewsStore((state) => state.category);
  const { isPending, error, data } = useFetchInfReactQuery(
    ["news", category],
    async ({ pageParam }) => {
      console.log(pageParam);
      const res = await fetch(news(category, 10));
      console.log("here", res);
      return res.json();
    }
  );

  return (
    <FlatList
      data={[]}
      renderItem={() => <View></View>}
      keyExtractor={(item) => item}
      ListHeaderComponent={() => (
        <>
          <TopTabFlatList />
          <MainSlide />
        </>
      )}
    />
  );
}
