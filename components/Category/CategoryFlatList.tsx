import { Text, View } from "react-native";
import { useTranslation }   from "react-i18next";

export default function CategoryFlatList({ category }: { category: string }) {
  const { t } = useTranslation();
  return (
    <View>
      <Text className="text-xl font-bold">{t(category)}</Text>
    </View>
  );
}
