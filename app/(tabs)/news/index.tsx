import { View, Text, ScrollView } from "react-native";
import { Link } from "expo-router";

const categories = [
  { name: "Top", path: "/news/categories/top" },
  { name: "Business", path: "/news/categories/business" },
  { name: "Entertainment", path: "/news/categories/entertainment" },
  { name: "Technology", path: "/news/categories/technology" },
  { name: "Sports", path: "/news/categories/sports" },
];

function CategoryTabs() {
  return (
    <View style={{ 
      flexDirection: "row", 
      padding: 10, 
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
    }}>
      {categories.map((category) => (
        <Link 
          key={category.path} 
          href={category.path} 
          asChild
        >
          <View style={{ 
            paddingHorizontal: 12, 
            paddingVertical: 8,
            marginRight: 8,
            borderRadius: 15,
            backgroundColor: '#f0f0f0'
          }}>
            <Text style={{ fontWeight: '500' }}>{category.name}</Text>
          </View>
        </Link>
      ))}
    </View>
  );
}

export default function NewsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CategoryTabs />
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, marginBottom: 16 }}>
          Select a category to view news
        </Text>
      </ScrollView>
    </View>
  );
}