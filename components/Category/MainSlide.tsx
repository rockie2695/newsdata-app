import { useFetchReactQuery } from "@/hook/useReactQuery";
import { slides } from "@/scripts/api";
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
import { Key, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNewsStore } from "@/providers/news-store-provider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function MainSlide() {
  const category = useNewsStore((state) => state.category);
  const {
    isPending,
    error,
    data: slidesData,
  } = useFetchReactQuery(["slide", category], () =>
    fetch(slides(category, 6)).then((res) => res.json())
  );
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = useWindowDimensions().width || 300;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  //when category change, reset scroll
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: 0,
      animated: false,
    });
    setActiveIndex(0);
  }, [category]);

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
        <View
          style={{ width: screenWidth }}
          className="aspect-video min-h-[180px] w-full"
        >
          {isPending ? (
            <View className="w-full h-full bg-gray-300 animate-pulse" />
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
              <View className="w-full h-full bg-gray-200" />
              <Text className="text-lg font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No Image
              </Text>
            </>
          ) : null}
          <LinearGradient
            className="absolute w-full md:bottom-0 bottom-[8px] left-0"
            // Background Linear Gradient from bottom to top
            colors={["black", "rgba(0,0,0,0.1)"]}
            start={[0, 1]}
            end={[0, 0]}
          >
            {isPending ? (
              <View className="w-full h-[44px] bg-gradient-to-t from-black to-black/10 p-2 line-clamp-2 text-ellipsis overflow-hidden animate-pulse" />
            ) : (
              <Text className="w-full text-white text-xl font-bold bg-gradient-to-t from-black to-black/10 p-2 line-clamp-2 text-ellipsis overflow-hidden">
                {item.title}
              </Text>
            )}
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
            className={`w-[6px] h-[6px] rounded-full mx-1 ${
              index === activeIndex ? "bg-cyan-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="relative">
      {error && (
        <View className="mt-4 flex flex-col items-center">
          <MaterialIcons name="error" size={24} color="red" />
          <Text className="text-lg text-red-500">
            {error?.message || "error"}
          </Text>
        </View>
      )}
      {!error && (
        <>
          <FlatList
            ref={flatListRef}
            data={
              slidesData?.success || [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
              ]
            }
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
