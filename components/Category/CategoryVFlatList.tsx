import { useNewsStore } from "@/providers/news-store-provider";
import { FlatList } from "react-native";
import MainSlide from "./MainSlide";
import TopTabFlatList from "./TopTabFlatList";
import { news } from "@/scripts/api";
import { useFetchInfReactQuery } from "@/hook/useInfReactQuery";

export default function CategoryVFlatList() {
  const category = useNewsStore((state) => state.category);
  const { isPending, error, data } = useFetchInfReactQuery(
    ["category", category],
    async ({ pageParam }) => {
      console.log(pageParam);
      const res = await fetch(news(category, 10));
      return res.json();
    }
  );

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
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
