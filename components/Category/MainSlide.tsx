import { useFetchReactQuery } from "@/hook/useReactQuery";
import slides from "@/scripts/slides";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";
import { Key, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function MainSlide({ category }: { category: string }) {
  const {
    isPending,
    error,
    data: slidesData,
  } = useFetchReactQuery(["category", category], slides(category, 6));
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Calculate the current page index
    const currentIndex = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(currentIndex);
  };

  const slideClicked = (item: any) => {
    console.log(item);
  };

  const SlideRenderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <Pressable key={item.id} onPress={() => slideClicked(item)}>
        <View style={{ width: screenWidth }} className="aspect-video">
          <Image source={{ uri: item.image_url }} className="w-full h-full" />
          <LinearGradient
            className="absolute w-full md:bottom-0 bottom-[8px] left-0"
            // Background Linear Gradient from bottom to top
            colors={["black", "rgba(0,0,0,0.1)"]}
            start={[0, 1]}
            end={[0, 0]}
          >
            <Text className="w-full text-white text-xl font-bold bg-gradient-to-t from-black to-black/10 p-2 line-clamp-2 text-ellipsis overflow-hidden">
              {item.title}
            </Text>
          </LinearGradient>
        </View>
      </Pressable>
    );
  };

  const DotPagination = ({ activeIndex }: { activeIndex: number }) => {
    return (
      <View className="flex flex-row items-center justify-center h-4 absolute w-full bottom-0 left-0 bg-black">
        {slidesData?.success?.map((_: any, index: Key | null | undefined) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === activeIndex ? "bg-cyan-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    );
  };

  return (
    slidesData &&
    slidesData?.success && (
      <View className="relative">
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
      </View>
    )
  );
}
