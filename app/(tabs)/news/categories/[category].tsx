import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useFetchReactQuery } from "@/hook/useReactQuery";
import slides from "@/scripts/slides";

export default function CategoryScreen() {
  const { category } = useLocalSearchParams();
  const { isPending, error, data } = useFetchReactQuery(
    ["category", category as string],
    slides(category as string, 6)
  );
  console.log(isPending, error, data);
  return (
    <View>
      <Text>Category screen {category}</Text>
    </View>
  );
}
