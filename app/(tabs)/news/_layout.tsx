import { Stack } from 'expo-router';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  'categories/[category]': {
    category: string;
  };
  // Add other screens here if needed
};

export default function NewsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="categories/[category]" 
          options={({ route }) => ({ 
            headerShown: true,
            headerTitle: `${route?.params?.category} News`.toUpperCase(),
            headerLargeTitle: true,
          })} 
        />
      </Stack>
    </View>
  );
}