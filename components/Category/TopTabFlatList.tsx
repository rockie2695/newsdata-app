import { useNewsStore } from "@/stores/news-store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Category = {
  id: string;
  key: string;
};

const CATEGORIES: Category[] = [
  { id: "1", key: "home" },
  { id: "2", key: "top" },
  { id: "3", key: "business" },
  { id: "4", key: "entertainment" },
  { id: "5", key: "technology" },
  { id: "6", key: "sports" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabItem = ({
  item,
  isActive,
  onPress,
}: {
  item: Category;
  isActive: boolean;
  onPress: (key: string) => void;
}) => {
  const { t } = useTranslation();
  const color = useSharedValue(isActive ? "#ffffff" : "#1f2937"); // white : gray-800
  const fontWeight = useSharedValue<"400" | "700">(isActive ? "700" : "400");
  const backgroundColor = useSharedValue(isActive ? "#06b6d4" : "transparent"); // cyan-500 : transparent

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(color.value, { duration: 0 }),
      fontWeight: withTiming(fontWeight.value, { duration: 0 }),
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, { duration: 0 }),
    };
  });

  useEffect(() => {
    color.value = withTiming(isActive ? "#ffffff" : "#1f2937", {
      duration: 0,
    });
    fontWeight.value = withTiming(isActive ? "700" : "400", {
      duration: 0,
    });
    backgroundColor.value = withTiming(isActive ? "#06b6d4" : "transparent", {
      duration: 0,
    });
  }, [isActive]);

  return (
    <AnimatedPressable
      onPress={() => onPress(item.key)}
      style={backgroundAnimatedStyle}
      className={
        "px-4 py-2 min-w-[60px] rounded-xl overflow-hidden flex items-center"
      }
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={item.key}
      hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
      android_ripple={{
        borderless: false,
        radius: 30,
        color: "#67e8f9",
      }}
    >
      <Animated.Text className={"text-base font-[NotoSansHK]"} style={textAnimatedStyle}>
        {t(item.key)}
      </Animated.Text>
    </AnimatedPressable>
  );
};

export default function TopTabFlatList() {
  const { category, setCategory } = useNewsStore();

  const renderItem = ({ item }: { item: Category }) => (
    <TabItem
      item={item}
      isActive={category === item.key}
      onPress={setCategory}
    />
  );

  return (
    <View className="bg-white sticky top-0 z-50">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 gap-2 py-1"
      />
    </View>
  );
}
