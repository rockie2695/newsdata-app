import { useLocalSearchParams } from "expo-router";
import ArticleView from "@/components/Article/ArticleView";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Article() {
  const { category, id } = useLocalSearchParams<{
    id: string;
    category: string;
  }>();
  return (
    <SafeAreaView className="flex-1">
      <ArticleView category={category} id={id} />
    </SafeAreaView>
  );
}
