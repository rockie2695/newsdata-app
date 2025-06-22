import { useLocalSearchParams } from "expo-router";
import ArticleView from "@/components/Article/ArticleView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
export default function Article() {
  const { category, id } = useLocalSearchParams<{
    id: string;
    category: string;
  }>();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ArticleView category={category} id={id} />
    </View>
  );
}
