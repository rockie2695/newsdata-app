import { useFetchInfReactQuery } from "@/hook/useInfReactQuery";
import { search as searchApi } from "@/scripts/api";
import { NewsResponse, TnewsSlide } from "@/type/news";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import RowSwitch from "../RowSwitch/RowSwitch";
import NewsVFlatList from "../News/NewsVFlatList";

export default function CategoryVFlatList({
  searchParam,
}: {
  searchParam: string;
}) {
  const { t } = useTranslation();

  const { isPending, error, data, fetchNextPage, isFetchingNextPage } =
    useFetchInfReactQuery<TnewsSlide[]>(
      ["search", searchParam],
      async ({ pageParam }) => {
        let res: Response;
        if (pageParam.length > 0 && pageParam[0] > 0 && pageParam[1]) {
          res = await fetch(
            searchApi(searchParam, 10, pageParam[0], pageParam[1])
          );
        } else {
          res = await fetch(searchApi(searchParam, 10));
        }
        const data: NewsResponse = await res.json();
        if (!data?.success) {
          throw new Error("Failed to fetch news");
        }
        return data.success; // This should be an array of TnewsSlide
      }
    );

  return (
    <NewsVFlatList
      ListHeaderComponent={
        <>
          <View className="mx-4 mt-6 h-[40px] flex flex-row items-center justify-between">
            <Text className="text-xl font-bold font-[NotoSansHK]">
              {t("search")}
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
