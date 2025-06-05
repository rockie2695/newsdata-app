import { useNewsStore } from "@/providers/news-store-provider";
import { FlatList, Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

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
  return (
    <Pressable
      onPress={() => onPress(item.key)}
      className={
        "px-4 py-2 min-w-[60px] transition-colors duration-300 ease-in-out " +
        (isActive ? "bg-cyan-500" : "")
      }
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={item.key}
      hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
      android_ripple={{
        borderless: false,
        radius: 50,
        color: "#67e8f9",
      }}
    >
      <Text
        className={"text-base " + (isActive ? "text-white" : "text-gray-800")}
        style={{
          fontWeight: isActive ? "600" : "400",
        }}
      >
        {t(item.key)}
      </Text>
    </Pressable>
  );
};

export default function TopTabFlatList() {
  const category = useNewsStore((state) => state.category);
  const setCategory = useNewsStore((state) => state.setCategory);

  const renderItem = ({ item }: { item: Category }) => (
    <TabItem
      item={item}
      isActive={category === item.key}
      onPress={setCategory}
    />
  );

  return (
    <View className="bg-white">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
