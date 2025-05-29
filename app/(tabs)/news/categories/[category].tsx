import { Text, View } from "react-native";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { useFetchReactQuery } from "@/hook/useReactQuery";
import slides from "@/scripts/slides";

export default function CategoryScreen() {
  const { category } = useLocalSearchParams();
  const { isPending, error, data } = useFetchReactQuery(
    ["category", category as string],
    slides(category as string, 6)
  );
  console.log(category, isPending, error, data);
  useFocusEffect(() => {
    console.log('here1')
    const onBeforeUnload = (e: any) => {
      // run your cleanup code here
      console.log("here check");
    };
    // window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      // window.removeEventListener("beforeunload", onBeforeUnload);
    };
  });
  return (
    <View>
      <Text>Category screen {category}</Text>
    </View>
  );
}
