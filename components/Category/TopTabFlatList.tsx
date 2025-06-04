import { useNewsStore } from "@/providers/news-store-provider";
import { FlatList, Pressable, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function TopTabFlatList() {
  const category = useNewsStore((state) => state.category);
  const setCategory = useNewsStore((state) => state.setCategory);
  const { t } = useTranslation();
  const categories = [
    { category: "home" },
    { category: "top" },
    { category: "business" },
    { category: "entertainment" },
    { category: "technology" },
    { category: "sports" },
  ];
  return (
    <FlatList
      className="bg-white"
      horizontal
      data={categories}
      renderItem={({ item, index }) => (
        <>
          <Pressable
            onPress={() => setCategory(item.category)}
            className={
              "px-4 py-2 min-w-[60px] transition-colors duration-300 ease-in-out " +
              (category === item.category ? "bg-cyan-500" : "")
            }
            android_ripple={{
              borderless: false,
              radius: 50,
              color: "#67e8f9",
            }}
          >
            <Text
              className={
                "text-base " + (category === item.category ? "text-white" : "")
              }
            >
              {t(item.category)}
            </Text>
          </Pressable>
        </>
      )}
    ></FlatList>
  );
}
