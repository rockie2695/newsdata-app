import { useFetchInfReactQuery } from "@/hook/useInfReactQuery";
import { news } from "@/scripts/api";
import { useNewsStore } from "@/stores/news-store";
import { NewsResponse, TnewsSlide } from "@/type/news";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import MainSlide from "./MainSlide";
import RowSwitch from "./RowSwitch";
import { formatDate } from "@/scripts/common";
import { router } from "expo-router";

export default function CategoryVFlatList() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const flatListRef = useRef<FlatList>(null);

  const { category } = useNewsStore();

  // Scroll to top when category changes
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [category]);

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
      }
    );
  const renderItem = ({ item, index }: { item: TnewsSlide; index: number }) => {
    return (
      <Pressable
        onPress={() =>
          router.push(
            `/news/article/${
              category !== "home" ? category : item.category[0]
            }/${item.id}`
          )
        }
        className={"mt-4 mx-4"}
      >
        <View className="aspect-video relative rounded-2xl overflow-hidden">
          {isPending ? (
            <View className="w-full h-full bg-gray-200 border border-gray-300 rounded-2xl animate-pulse" />
          ) : null}
          {!isPending && item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              className="w-full h-full object-cover"
              progressiveRenderingEnabled={true}
            />
          ) : null}
          {!isPending && !item.image_url ? (
            <>
              <View className="w-full h-full bg-gray-200 border border-gray-300 rounded-2xl" />
              <Text className="text-lg font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[NotoSansHK]">
                No Image
              </Text>
            </>
          ) : null}

          {isPending ? (
            <View className="absolute bottom-0 left-0 px-2 py-[2px] w-[33%] h-[24px] bg-gray-500/50 rounded-tr-2xl animate-pulse" />
          ) : (
            <Text className="text-sm text-center absolute bottom-0 left-0 px-2 py-[2px] bg-gray-500/50 text-white rounded-tr-2xl font-[NotoSansHK]">
              {item.source_id}
              {item.creator ? " | " + item.creator : ""}
            </Text>
          )}
        </View>
        {isPending ? (
          <>
            <View className="mt-2 w-full h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
            <View className="mt-2 w-[50%] h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
          </>
        ) : (
          <Text className="text-lg mt-2 line-clamp-2 font-[NotoSansHK]">
            {item.title}
          </Text>
        )}
        {isPending ? (
          <View className="mt-2 w-full h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
        ) : (
          <Text className="text-sm text-gray-500 font-[NotoSansHK]">
            {formatDate(item.pubdate, currentLanguage, true)}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        ref={flatListRef}
        className="pb-6"
        data={data?.pages.flat()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (!isPending && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <>
            <MainSlide />
            <View className="mx-4 mt-6 h-[40px] flex flex-row items-center justify-between">
              <Text className="text-xl font-bold font-[NotoSansHK]">
                {t("details")}
              </Text>
              <View className="flex flex-row items-center">
                <RowSwitch />
              </View>
            </View>
          </>
        )}
        ListFooterComponent={
          <>
            {error ? (
              <View className="mt-4 flex flex-col items-center">
                <MaterialIcons name="error" size={24} color="red" />
                <Text className="text-lg text-red-500 font-[NotoSansHK]">
                  {error?.message || "error"}
                </Text>
              </View>
            ) : (
              <View className="py-4">
                <ActivityIndicator size="large" color="#06b6d4" />
              </View>
            )}
          </>
        }
      />
    </View>
  );
}
