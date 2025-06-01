import { useFetchReactQuery } from "@/hook/useReactQuery";
import slides from "@/scripts/slides";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Key, useRef, useState } from "react";
export default function Index() {
  const categories = [
    { name: "Home", category: "home" },
    { name: "Top", category: "top" },
    { name: "Business", category: "business" },
    { name: "Entertainment", category: "entertainment" },
    { name: "Technology", category: "technology" },
    { name: "Sports", category: "sports" },
  ];
  const [category, setCategory] = useState<string>("home");
  const {
    isPending,
    error,
    data: slidesData,
  } = useFetchReactQuery(
    ["category", category as string],
    slides(category as string, 6)
  );
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  console.log(isPending, error, slidesData);

  const slideClicked = (item: any) => {
    console.log(item);
  };

  const SlideRenderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <Pressable key={item.id} onPress={() => slideClicked(item)}>
        <View style={{ width: screenWidth }} className="aspect-video">
          <Image source={{ uri: item.image_url }} className="w-full h-full" />
          <Text className="absolute w-full bottom-0 left-0 text-white text-lg font-bold bg-gradient-to-t from-black to-black/10 p-2 line-clamp-2 text-ellipsis overflow-hidden">
            {item.title}
          </Text>
        </View>
      </Pressable>
    );
  };

  const DotPagination = ({ activeIndex }: { activeIndex: number }) => {
    return (
      <View className="flex-row items-center">
        {slidesData?.success?.map((_: any, index: Key | null | undefined) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === activeIndex ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    );
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Calculate the current page index
    const currentIndex = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(currentIndex);
  };

  return (
    <View>
      <FlatList
        className="bg-white"
        horizontal
        data={categories}
        renderItem={({ item, index }) => (
          <>
            <Pressable
              onPress={() => setCategory(item.category)}
              className="px-4 py-2"
              android_ripple={{
                borderless: false,
                radius: 50,
                color: "#67e8f9",
              }}
            >
              <Text className="text-base">{item.name}</Text>
            </Pressable>
          </>
        )}
      ></FlatList>
      <Text>Category screen {category}</Text>
      {slidesData && slidesData?.success && (
        <>
          <FlatList
            ref={flatListRef}
            data={slidesData?.success}
            keyExtractor={(item) => item.id}
            renderItem={SlideRenderItem}
            horizontal
            pagingEnabled
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              { useNativeDriver: false, listener: onScroll }
            )}
            scrollEventThrottle={16}
          />
          <DotPagination activeIndex={activeIndex} />
        </>
      )}
    </View>
  );
}
