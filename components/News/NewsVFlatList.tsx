import { useNewsStore } from "@/stores/news-store";
import { TnewsSlide } from "@/type/news";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControlProps,
  Text,
  View,
} from "react-native";
import { formatDate } from "@/scripts/common";
import { router } from "expo-router";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

export default function NewsVFlatList({
  ListHeaderComponent,
  isPending,
  error,
  data,
  fetchNextPage,
  isFetchingNextPage,
  refreshControl,
}: {
  ListHeaderComponent?: React.ReactElement | null;
  isPending: boolean;
  error: Error | null;
  data: InfiniteData<TnewsSlide[], unknown> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<TnewsSlide[], unknown>, Error>
  >;
  isFetchingNextPage: boolean;
  refreshControl: React.ReactElement<RefreshControlProps>;
}) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const flatListRef = useRef<FlatList>(null);

  const { category, isRow } = useNewsStore();
  const [isShowLoading, setIsShowLoading] = useState(false);

  // Scroll to top when category changes
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [category]);

  useEffect(() => {
    if (isFetchingNextPage) {
      setIsShowLoading(true);
    } else {
      setIsShowLoading(false);
    }
  }, [isFetchingNextPage]);

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
        className={"mt-4 mx-4" + (isRow ? " flex-row gap-2 flex" : "")}
      >
        {isRow ? (
          <>
            {isPending ? (
              <View className="aspect-video relative rounded-2xl overflow-hidden w-full">
                <View className="w-full h-full bg-gray-200 border border-gray-300 rounded-2xl animate-pulse" />
              </View>
            ) : null}
            {!isPending && item.image_url ? (
              <View className="aspect-video relative rounded-2xl overflow-hidden w-full flex-1">
                <Image
                  source={{ uri: item.image_url }}
                  className="w-full h-full object-cover"
                  progressiveRenderingEnabled={true}
                />
              </View>
            ) : null}
            <View
              className={
                "w-full" +
                ((!isPending && item.image_url) || isPending ? " flex-[2]" : "")
              }
            >
              {isPending ? (
                <>
                  <View className="w-full h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
                  <View className="mt-2 w-[50%] h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
                </>
              ) : (
                <Text className="text-lg line-clamp-2 font-[NotoSansHK]">
                  {item.title}
                </Text>
              )}
              {isPending ? (
                <View className="mt-2 w-full h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
              ) : (
                <Text className="text-sm text-gray-500 font-[NotoSansHK]">
                  {item.source_id}
                  {item.creator &&
                  item.creator.length > 0 &&
                  item.creator[0] !== "auto_generator"
                    ? " | " + item.creator.map((creator) => creator).join(" ")
                    : ""}
                </Text>
              )}
              {isPending ? (
                <View className="mt-2 w-full h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
              ) : (
                <Text className="text-sm text-gray-500 font-[NotoSansHK]">
                  {formatDate(item.pubdate, currentLanguage, true)}
                </Text>
              )}
            </View>
          </>
        ) : null}
        {!isRow ? (
          <>
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
                  {item.creator &&
                  item.creator.length > 0 &&
                  item.creator[0] !== "auto_generator"
                    ? " | " + item.creator.map((creator) => creator).join(" ")
                    : ""}
                </Text>
              )}
            </View>
            <View>
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
            </View>
          </>
        ) : null}
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
            setIsShowLoading(true);
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={
          <>
            {error ? (
              <View className="mt-4 flex flex-col items-center">
                <MaterialIcons name="error" size={24} color="red" />
                <Text className="text-lg text-red-500 font-[NotoSansHK]">
                  {error?.message || "error"}
                </Text>
              </View>
            ) : null}
            {isShowLoading && (
              <View className="py-4">
                <ActivityIndicator size="large" color="#06b6d4" />
              </View>
            )}
          </>
        }
        refreshControl={refreshControl}
      />
    </View>
  );
}
