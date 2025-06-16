import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ArticleView from "@/components/Article/ArticleView";
export default function Article() {
  const { category, id } = useLocalSearchParams<{
    id: string;
    category: string;
  }>();
  return (
    <>
      <ArticleView category={category} id={id} />
    </>
  );
}
