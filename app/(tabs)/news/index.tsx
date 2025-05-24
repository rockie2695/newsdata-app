import { FlatList, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const categories = [
    { name: "Home", path: "/news" },
    { name: "Top", path: "/news/categories/top" },
    { name: "Business", path: "/news/categories/business" },
    { name: "Entertainment", path: "/news/categories/entertainment" },
    { name: "Technology", path: "/news/categories/technology" },
    { name: "Sports", path: "/news/categories/sports" },
  ];
  return (
    <View style={{}}>
      <FlatList
        className="bg-white"
        horizontal
        data={categories}
        renderItem={({ item, index }) => (
          <>
            <Link href={item.path} asChild>
              <Pressable className="px-4 py-2">
                <Text className="text-base">{item.name}</Text>
              </Pressable>
            </Link>
            {/* <Pressable
              onPress={() => {
                console.log(index);
              }}
              className="px-4 py-2"
            >
              <Text>{item}</Text>
            </Pressable> */}
          </>
        )}
      ></FlatList>
      <Text className="color-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
