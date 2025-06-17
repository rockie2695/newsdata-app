import { useFetchReactQuery } from "@/hook/useReactQuery";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { article } from "@/scripts/api";
import ParallaxScrollView from "./ParallelScrollView";
import CategoryHFlatList from "../Category/CategoryHFlatList";
export default function Article({
  category,
  id,
}: {
  category: string;
  id: string;
}) {
  const {
    isPending,
    error,
    data: articleData,
  } = useFetchReactQuery(["article", category, id], () =>
    fetch(article(category, id)).then((res) => res.json())
  );
  console.log(articleData);
  const screenWidth = useWindowDimensions().width || 300;
  const imageHeight = screenWidth * (9 / 16);
  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        parallaxHeaderContent={
          <View className="aspect-video  w-full">
            {isPending ? (
              <View className="w-full h-full bg-gray-300 animate-pulse" />
            ) : null}
            {!isPending && articleData?.success?.image_url ? (
              <Image
                source={{ uri: articleData.success.image_url }}
                className="w-full h-full object-cover"
                progressiveRenderingEnabled={true}
              />
            ) : null}
            {!isPending && !articleData?.success?.image_url ? (
              <>
                <View className="w-full h-full bg-gray-200" />
                <Text className="text-lg font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  No Image
                </Text>
              </>
            ) : null}
          </View>
        }
        parallaxHeaderHeight={imageHeight}
      >
        <View className="bg-gray-100 pt-2">
          <Text className="text-xl font-bold font-[NotoSansHK] mx-2">
            {articleData?.success?.title}
          </Text>

          <View className="flex flex-col gap-6 py-6">
            {articleData?.success?.category.length > 0 &&
              articleData.success.category.map((item: string) => (
                <CategoryHFlatList key={item} category={item} />
              ))}
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
}
