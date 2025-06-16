import i18n from "@/scripts/i18n";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";

export default function TopStatusBar() {
  return (
    <View className="w-full h-12 bg-white px-4 py-1 flex items-center justify-between flex-row">
      <Text className="text-xl font-bold text-cyan-500">NewsData</Text>
      <Pressable
        onPress={() =>
          i18n.changeLanguage(i18n.language === "en" ? "zh-HK" : "en")
        }
      >
        <MaterialIcons name="g-translate" size={24} color="#06b6d4" />
      </Pressable>
    </View>
  );
}
