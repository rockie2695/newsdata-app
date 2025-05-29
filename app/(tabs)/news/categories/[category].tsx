import { useLocalSearchParams, Link } from "expo-router";
import { useFetchReactQuery } from "@/hook/useReactQuery";
import slides from "@/scripts/slides";
import { FlatList, Pressable, Text, View } from "react-native";

export default function CategoryScreen() {
  const categories = [
    { name: "Home", path: "/news/categories/home" },
    { name: "Top", path: "/news/categories/top" },
    { name: "Business", path: "/news/categories/business" },
    { name: "Entertainment", path: "/news/categories/entertainment" },
    { name: "Technology", path: "/news/categories/technology" },
    { name: "Sports", path: "/news/categories/sports" },
  ];
  const { category } = useLocalSearchParams();
  const { isPending, error, data } = useFetchReactQuery(
    ["category", category as string],
    slides(category as string, 6)
  );
  console.log(category, isPending, error, data);
  return (
    <View>
      <FlatList
        className="bg-white"
        horizontal
        data={categories}
        renderItem={({ item, index }) => (
          <>
            <Link href={item.path} asChild>
              <Pressable
                className="px-4 py-2"
                android_ripple={{
                  borderless: false,
                  radius: 50,
                  color: "#67e8f9",
                }}
              >
                <Text className="text-base">{item.name}</Text>
              </Pressable>
            </Link>
          </>
        )}
      ></FlatList>
      <Text>Category screen {category}</Text>
    </View>
  );
}
