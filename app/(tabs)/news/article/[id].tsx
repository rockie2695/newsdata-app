import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
export default function Article() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);
  return (
    <View>
      <Text>Article {id}</Text>
    </View>
  );
}
