import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ArticleScreen() {
  const { articleId, category } = useLocalSearchParams();
  return (
    <View>
      <Text>
        Article screen {articleId} {category}
      </Text>
    </View>
  );
}
