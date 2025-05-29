import { useLocalSearchParams, Link } from "expo-router";
import { useFetchReactQuery } from "@/hook/useReactQuery";
import slides from "@/scripts/slides";
import { FlatList, Pressable, Text, View } from "react-native";
import { useState } from "react";
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
  const { isPending, error, data } = useFetchReactQuery(
    ["category", category as string],
    slides(category as string, 6)
  );
  console.log(isPending, error, data);
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
    </View>
  );
}
