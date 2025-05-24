import { Stack } from 'expo-router';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';

export default function CategoryScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  // This would be your actual news data fetching logic
  const newsItems = [
    { id: 1, title: `Latest news about ${category}`, content: 'News content goes here...' },
    { id: 2, title: `More ${category} updates`, content: 'More content...' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen 
        options={{ 
          title: `${category} News`.toUpperCase(),
          headerLargeTitle: true,
        }} 
      />
      
      <ScrollView style={{ flex: 1 }}>
        {newsItems.map((item) => (
          <View 
            key={item.id} 
            style={{ 
              padding: 16, 
              borderBottomWidth: 1, 
              borderBottomColor: '#eee' 
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ marginTop: 8 }}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}