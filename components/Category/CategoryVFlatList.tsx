import { useFetchInfReactQuery } from "@/hook/useInfReactQuery";
import { news } from "@/scripts/api";
import { useNewsStore } from "@/stores/news-store";
import { NewsResponse, TnewsSlide } from "@/type/news";
import { useTranslation } from "react-i18next";
import { RefreshControl, Text, View } from "react-native";
import MainSlide from "./MainSlide";
import RowSwitch from "../RowSwitch/RowSwitch";
import NewsVFlatList from "../News/NewsVFlatList";
import useRefreshing from "@/hook/useRefreshing";

export default function CategoryVFlatList() {
  const { t } = useTranslation();

  const { category } = useNewsStore();

  const { refreshing, onRefresh } = useRefreshing();

  const { isPending, error, data, fetchNextPage, isFetchingNextPage } =
    useFetchInfReactQuery<TnewsSlide[]>(
      ["news", category],
      async ({ pageParam }) => {
        let res: Response;
        if (pageParam.length > 0 && pageParam[0] > 0 && pageParam[1]) {
          res = await fetch(news(category, 10, pageParam[0], pageParam[1]));
        } else {
          res = await fetch(news(category, 10));
        }
        const data: NewsResponse = await res.json();
        if (!data?.success) {
          throw new Error("Failed to fetch news");
        }
        return data.success; // This should be an array of TnewsSlide
      },
      !refreshing
    );

  return (
    <NewsVFlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#06b6d4"]}
        />
      }
      ListHeaderComponent={
        <>
          <MainSlide refreshing={refreshing} />
          <View className="mx-4 mt-6 h-[40px] flex flex-row items-center justify-between">
            <Text className="text-xl font-bold font-[NotoSansHK]">
              {t("details")}
            </Text>
            <View className="flex flex-row items-center">
              <RowSwitch />
            </View>
          </View>
        </>
      }
      isPending={isPending}
      error={error}
      data={data}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
