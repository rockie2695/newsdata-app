import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CategoryScreen() {
  const { category } = useLocalSearchParams();
  return (
    <View>
      <Text>Category screen {category}</Text>
    </View>
  );
}
