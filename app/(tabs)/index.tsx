import { FlatList, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  const test = [
    "Home",
    "Top",
    "Business",
    "Entertainment",
    "Technology",
    "Sports",
  ];
  return (
    <View style={{}}>
      <FlatList
        className="bg-white"
        horizontal
        data={test}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              console.log(index);
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        )}
      ></FlatList>
      <Text className="color-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
