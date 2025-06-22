import { TnewsSlide } from "@/type/news";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const CategoryHFlatItem = ({
  item,
  index,
  category,
  isPending,
  screenWidth,
}: {
  item: TnewsSlide;
  index: number;
  category: string;
  isPending: boolean;
  screenWidth: number;
}) => {
  return (
    <Pressable
      onPress={() =>
        router.push(
          `/news/article/${category !== "home" ? category : item.category[0]}/${
            item.id
          }`
        )
      }
      style={{ width: screenWidth - 4 * 16 }}
      className={"ml-4" + (index === 5 ? " mr-4" : "")}
    >
      <View className="aspect-video relative rounded-2xl overflow-hidden border" style={{borderColor: "#e5e7eb"}}>
        {isPending ? (
          <View className="w-full h-full bg-gray-200 rounded-2xl animate-pulse" />
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
            <View className="w-full h-full bg-gray-200 rounded-2xl" />
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
    </Pressable>
  );
};

export default CategoryHFlatItem;
