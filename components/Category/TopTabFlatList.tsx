import { useNewsStore } from "@/providers/news-store-provider";
import { FlatList, Pressable, Text } from "react-native";

export default function TopTabFlatList() {
  const setCategory = useNewsStore((state) => state.setCategory);
  const categories = [
    { name: "Home", category: "home" },
    { name: "Top", category: "top" },
    { name: "Business", category: "business" },
    { name: "Entertainment", category: "entertainment" },
    { name: "Technology", category: "technology" },
    { name: "Sports", category: "sports" },
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
  );
}
