import { FlatList, Text, useWindowDimensions, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useFetchReactQuery } from "@/hook/useReactQuery";
import { news } from "@/scripts/api";
import { Pressable, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNewsStore } from "@/providers/news-store-provider";

export default function CategoryFlatList({ category }: { category: string }) {
  const { t } = useTranslation();
  const {
    isPending,
    error,
    data: newsData,
  } = useFetchReactQuery(["category", category], news(category, 6));
  const screenWidth = useWindowDimensions().width || 300;
  const setCategory = useNewsStore((state) => state.setCategory);

  return (
    <View>
      <Pressable
        onPress={() => setCategory(category)}
        className="flex flex-row items-center justify-between mx-4"
      >
        <Text className="text-xl font-bold">{t(category)}</Text>
        <MaterialIcons name="arrow-forward" size={24} color="black" />
      </Pressable>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth - 4 * 16 + 16 - 2}
        snapToAlignment="start"
        decelerationRate="normal"
        className="mt-4 min-w-full"
        data={
          newsData?.success || [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
          ]
        } // mock data
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => console.log(item)}
            style={{ width: screenWidth - 4 * 16 }}
            className={"ml-4" + (index === 5 ? " mr-4" : "")}
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
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
