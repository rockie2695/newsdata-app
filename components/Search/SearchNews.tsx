import useDebounceSearch from "@/hook/useDebounceSearch";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform, TextInput, View } from "react-native";
import SearchVFlatList from "./SearchVFlatList";
import { useTranslation } from "react-i18next";

export default function SearchNews() {
  const { search, setSearch, deferredSearch, searchParam } =
    useDebounceSearch("");
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 8,
          paddingVertical: 2,
          margin: 8,
          borderWidth: 1,
          borderColor: "#06b6d4",
          borderRadius: 16,
        }}
      >
        <MaterialIcons name="search" size={24} color="#06b6d4" />
        <TextInput
          onChangeText={setSearch}
          value={search}
          placeholder={t("searchPlaceholder")}
          keyboardType="default"
          style={{
            flex: 1,
            color: "#06b6d4",
            fontSize: 16,
            lineHeight: 20,
            padding: 8,
          }}
        />
        {search ? (
          <MaterialIcons
            name="close"
            size={24}
            color="#06b6d4"
            onPress={() => setSearch("")}
            style={Platform.OS === "web" ? { cursor: "pointer" } : {}}
          />
        ) : null}
      </View>
      <SearchVFlatList searchParam={searchParam} />
    </View>
  );
}
