import { Text, ScrollView } from "react-native";
import { useState } from "react";
import TopTabFlatList from "@/components/Category/TopTabFlatList";
import MainSlide from "@/components/Category/MainSlide";
export default function Index() {
  const [category, setCategory] = useState<string>("home");

  console.log("render");
  return (
    <ScrollView>
      <TopTabFlatList category={category} setCategory={setCategory} />
      <Text>Category screen {category}</Text>
      <MainSlide category={category} />
    </ScrollView>
  );
}
