import { ScrollView, RefreshControl } from "react-native";
import MainSlide from "../Category/MainSlide";
import CategoryHFlatList from "../Category/CategoryHFlatList";
import { View } from "react-native";
import useRefreshing from "@/hook/useRefreshing";
const HomeScrollView = () => {
  const { refreshing, onRefresh } = useRefreshing();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#06b6d4"]}
        />
      }
    >
      {/*  stickyHeaderIndices={[0]} */}
      <MainSlide refreshing={refreshing} />
      <View className="flex flex-col gap-6 py-6 bg-white">
        {["top", "business", "entertainment", "technology", "sports"].map(
          (item) => (
            <CategoryHFlatList
              key={item}
              category={item}
              refreshing={refreshing}
            />
          )
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScrollView;
