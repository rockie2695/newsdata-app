import { FlatList, Text, View } from "react-native";
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
  return (
    <View>
      <Text className="text-xl font-bold">{t(category)}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={newsData?.success || []}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => console.log(item)}
            className="w-[calc(100vw-2rem)]"
          >
            <View className="aspect-video">
              <Image
                source={{ uri: item.image_url }}
                className="w-full h-full object-cover"
              />
            </View>
            <Text className="text-lg font-bold mt-2 line-clamp-2">
              {item.title}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
