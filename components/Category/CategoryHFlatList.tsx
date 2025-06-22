import { useFetchReactQuery } from "@/hook/useReactQuery";
import { news } from "@/scripts/api";
import { useNewsStore } from "@/stores/news-store";
import { NewsResponse, TnewsSlide } from "@/type/news";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import CategoryHFlatItem from "./CategoryHFlatItem";

export default function CategoryHFlatList({
  category,
  refreshing,
  needBackPage = false,
}: {
  category: string;
  refreshing: boolean;
  needBackPage?: boolean;
}) {
  const { t } = useTranslation();
  const {
    isPending,
    error,
    data: newsData,
  } = useFetchReactQuery<NewsResponse>(
    ["category", category],
    () =>
      fetch(news(category, 6)).then(
        (res) => res.json() as Promise<NewsResponse>
      ),
    !refreshing
  );
  const screenWidth = useWindowDimensions().width || 300;
  const { setCategory } = useNewsStore();

  return (
    <View>
      <Pressable
        onPress={() => {
          setCategory(category);
          if (needBackPage) {
            router.back();
          }
        }}
        className="flex flex-row items-center justify-between px-4"
      >
        <Text className="text-xl font-bold font-[NotoSansHK]">
          {t(category)}
        </Text>
        <View className="p-2 hover:bg-gray-300 rounded-full">
          <MaterialIcons
            name="arrow-forward"
            size={24}
            color="black"
            onPress={() => {
              setCategory(category);
              if (needBackPage) {
                router.back();
              }
            }}
          />
        </View>
      </Pressable>
      {error && (
        <View className="mt-4 flex flex-col items-center">
          <MaterialIcons name="error" size={24} color="red" />
          <Text className="text-lg text-red-500 font-[NotoSansHK]">
            {error?.message || "error"}
          </Text>
        </View>
      )}
      {!error && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth - 4 * 16 + 16 - 2}
          snapToAlignment="start"
          decelerationRate="normal"
          className="mt-4 min-w-full"
          data={newsData?.success || placeholderData} // mock data
          renderItem={({ item, index }) => (
            <CategoryHFlatItem
              item={item}
              index={index}
              category={category}
              isPending={isPending}
              screenWidth={screenWidth}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const placeholderData: TnewsSlide[] = Array(6)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    category: ["general"],
    country: ["us"],
    creator: [""],
    description: "",
    image_url: null,
    language: "en",
    link: "",
    pubdate: new Date().toISOString(),
    source_id: "",
    source_priority: 0,
    title: "Loading...",
    video_url: null,
    insert_time: new Date().toISOString(),
    content: "",
    keywords: [],
  }));
