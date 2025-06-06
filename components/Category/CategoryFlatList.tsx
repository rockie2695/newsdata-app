import { FlatList, Text, useWindowDimensions, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useFetchReactQuery } from "@/hook/useReactQuery";
import { news } from "@/scripts/api";
import { Pressable, Image } from "react-native";

export default function CategoryFlatList({ category }: { category: string }) {
  const { t } = useTranslation();
  const {
    isPending,
    error,
    data: newsData,
  } = useFetchReactQuery(["category", category], news(category, 6));
  const screenWidth = useWindowDimensions().width;
  return (
    <View>
      <Text className="text-xl font-bold mx-4">{t(category)}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth - 3 * 16 - 4}
        snapToAlignment="start"
        decelerationRate="normal"
        className="mt-2"
        data={newsData?.success || []}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => console.log(item)}
            style={{ width: screenWidth - 4 * 16 }}
            className={"ml-4" + (index === 5 ? " mr-4" : "")}
          >
            <View className="aspect-video relative rounded-2xl overflow-hidden">
              {item.image_url ? (
                <Image
                  source={{ uri: item.image_url }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <View className="w-full h-full bg-gray-200" />
                  <Text className="text-lg font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    No Image
                  </Text>
                </>
              )}
              <Text className="text-sm text-center absolute bottom-0 left-0 px-2 py-[2px] bg-gray-500/50 text-white rounded-tr-2xl">
                {item.source_id}
                {item.creator ? " | " + item.creator : ""}
              </Text>
            </View>
            <Text className="text-lg mt-2 line-clamp-2">{item.title}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
