import { useFetchInfReactQuery } from "@/hook/useInfReactQuery";
import { news } from "@/scripts/api";
import { useNewsStore } from "@/stores/news-store";
import { NewsResponse, TnewsSlide } from "@/type/news";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { zhHK } from "date-fns/locale/zh-HK";
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

const formatDate = (dateString: string, language: string) => {
  const date = new Date(dateString);
  const now = new Date();

  // If the date is more than 1 day ago, show full date and time
  if (differenceInDays(now, date) >= 1) {
    if (language === "zh-HK") {
      return format(date, "yyyy年MM月dd日 HH:mm");
    }
    return format(date, "MMM d, yyyy h:mm a");
  }

  // Otherwise, show relative time
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: language === "zh-HK" ? zhHK : undefined,
  });
};

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
      <Pressable onPress={() => console.log(item)} className={"mt-4 mx-4"}>
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
              <Text className="text-lg font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No Image
              </Text>
            </>
          ) : null}

          {isPending ? (
            <View className="absolute bottom-0 left-0 px-2 py-[2px] w-[33%] h-[24px] bg-gray-500/50 rounded-tr-2xl animate-pulse" />
          ) : (
            <Text className="text-sm text-center absolute bottom-0 left-0 px-2 py-[2px] bg-gray-500/50 text-white rounded-tr-2xl">
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
          <Text className="text-lg mt-2 line-clamp-2">{item.title}</Text>
        )}
        {isPending ? (
          <View className="mt-2 w-full h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
        ) : (
          <Text className="text-sm text-gray-500">
            {formatDate(item.pubdate, currentLanguage)}
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
              <Text className="text-xl font-bold">{t("details")}</Text>
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
                <Text className="text-lg text-red-500">
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
